import { UserService } from "./user-service";
import { CommandClient, User } from "eris";
import { SertaUser } from "../model/serta-user";
import { UserDao } from "../dao/user-dao";
import { DbUserEntry } from "../model/db-user-entry";
import { ConfigurationBuilder } from "../config/configuration-builder";

const createLogger = require('logging').default;
const logger = createLogger('serta-user-service');


export class SertaUserService implements UserService {

    private _bot: CommandClient;
    private _userDao: UserDao

    constructor(
        bot: CommandClient,
        userDao: UserDao) {
        this._bot = bot;
        this._userDao = userDao;
    }

    public async getByDiscordUserId(userId: string): Promise<SertaUser> {
        return new Promise<SertaUser>(async (resolve, reject) => {
            await this.getUserAndClearPromise(userId, this.getDiscordUserById, resolve, reject);
        })
    }

    private async getUserAndClearPromise(
        userIdOrName: string,
        getDiscordUser: (userIdOrName: string) => User | undefined,
        resolve: (user: SertaUser) => void,
        reject: (reason: string) => void): Promise<void> {
        const discordUser = getDiscordUser.call(this, userIdOrName)
        if (discordUser) {
            const daoUser = await this.getDaoUser(discordUser.id)
            let user = this.assembleSertaUser(daoUser, discordUser);
            resolve(user)
        } else {
            reject("Discord user not found")
        }
    }

    private getDiscordUserById(userId: string): User | undefined {
        return this._bot.users.get(userId);
    }

    private async getDaoUser(userId: string): Promise<DbUserEntry | undefined> {
        return await this._userDao.getById(userId);
    }

    private assembleSertaUser(dbUserEntry: DbUserEntry | undefined, botUser: User): SertaUser {
        let user: SertaUser
        if (dbUserEntry) {
            user = new SertaUser(botUser, dbUserEntry)
        } else {
            const dbEntry = this.createAndStoreDbEntry(botUser);
            user = new SertaUser(botUser, dbEntry)
        }
        return user;
    }

    private createAndStoreDbEntry(botUser: User): DbUserEntry {
        const initialLevel = ConfigurationBuilder.getConfiguration().gameLevelInformation.initialLevel
        const dbEntry = new DbUserEntry(botUser.id, initialLevel.id, initialLevel.minimumImmuneLevel, 0)
        this._userDao.add(dbEntry)
        return dbEntry;
    }

    public async getByDiscordUserName(userName: string): Promise<SertaUser> {
        return new Promise<SertaUser>(async (resolve, reject) => {
            await this.getUserAndClearPromise(userName, this.getDiscordUserByUserName, resolve, reject)
        })
    }

    private getDiscordUserByUserName(userName: string): User | undefined {
        let foundUser: User | undefined = undefined
        this._bot.users.map((oneUser) => {
            if (oneUser.username === userName) {
                foundUser = oneUser
            }
        })
        return foundUser
    }

    public async getAll(): Promise<SertaUser[]> {
        return new Promise<SertaUser[]>(async (resolve) => {

            let result = this._bot.users.map(async (erisUser) => {

                let dbUser = await this._userDao.getById(erisUser.id);
                if (dbUser) {
                    return new SertaUser(erisUser, dbUser);
                } else {
                    dbUser = this.createAndStoreDbEntry(erisUser)
                    return new SertaUser(erisUser, dbUser)
                }
            });

            resolve(await Promise.all(result));
        })
    }
}