import { IUserService } from "./i-user-service";
import { CommandClient, User } from "eris";
import { SertaUser } from "../model/serta-user";
import { IUserDao } from "../dao/i-user-dao";
import { DbUserEntry } from "../model/db-user-entry";
import { ConfigurationBuilder } from "../config/configuration-builder";
import {ISertaUser} from "../model/i-serta-user";
require('logging').default;

export class SertaUserService implements IUserService {

    private bot: CommandClient;
    private userDao: IUserDao

    constructor(
        bot: CommandClient,
        userDao: IUserDao) {
        this.bot = bot;
        this.userDao = userDao;
    }
    
    public async update(user: SertaUser): Promise<void> {
        this.userDao.addOrMerge(user.dbUserEntry);
    }

    public async getByDiscordUserId(userId: string): Promise<ISertaUser> {
        return new Promise<ISertaUser>(async (resolve, reject) => {
            await this.getUserAndClearPromise(userId, this.getDiscordUserById, resolve, reject);
        })
    }

    private async getUserAndClearPromise(
        userIdOrName: string,
        getDiscordUser: (userIdOrName: string) => User | undefined,
        resolve: (user: ISertaUser) => void,
        reject: (reason: string) => void): Promise<void> {
        const discordUser = getDiscordUser.call(this, userIdOrName)
        if (discordUser) {
            const daoUser = await this.getDaoUser(discordUser.id)
            let user = await this.assembleSertaUser(daoUser, discordUser);
            resolve(user)
        } else {
            reject("Discord user not found")
        }
    }

    private getDiscordUserById(userId: string): User | undefined {
        return this.bot.users.get(userId);
    }

    private async getDaoUser(userId: string): Promise<DbUserEntry | undefined> {
        return await this.userDao.getById(userId);
    }

    private async assembleSertaUser(dbUserEntry: DbUserEntry | undefined, botUser: User): Promise<ISertaUser> {
        let user: ISertaUser
        if (dbUserEntry) {
            user = new SertaUser(botUser, dbUserEntry)
        } else {
            const dbEntry = await this.createAndStoreDbEntry(botUser);
            user = new SertaUser(botUser, dbEntry)
        }
        return user;
    }

    private async createAndStoreDbEntry(botUser: User): Promise<DbUserEntry> {
        const config = await ConfigurationBuilder.getConfiguration();
        const initialLevel = await config.gameLevelInformation.initialLevel
        const dbEntry = new DbUserEntry(botUser.id, initialLevel.id, initialLevel.minimumImmuneLevel, 0)
        this.userDao.addOrMerge(dbEntry)
        return dbEntry;
    }

    public async getByDiscordUserName(discordUserName: string): Promise<ISertaUser> {
        return new Promise<ISertaUser>(async (resolve, reject) => {
            await this.getUserAndClearPromise(discordUserName, this.getDiscordUserByUserName, resolve, reject)
        })
    }

    private getDiscordUserByUserName(userName: string): User | undefined {
        let foundUser: User | undefined = undefined
        this.bot.users.map((oneUser) => {
            if (oneUser.username === userName) {
                foundUser = oneUser
            }
        })
        return foundUser
    }

    public async getAll(): Promise<ISertaUser[]> {
        return new Promise<ISertaUser[]>(async (resolve) => {

            let result = this.bot.users.map(async (erisUser) => {

                let dbUser = await this.userDao.getById(erisUser.id);
                if (dbUser) {
                    return new SertaUser(erisUser, dbUser);
                } else {
                    dbUser = await this.createAndStoreDbEntry(erisUser)
                    return new SertaUser(erisUser, dbUser)
                }
            });

            resolve(await Promise.all(result));
        })
    }

    public async put(user: ISertaUser): Promise<ISertaUser> {
        const dbUserEntry = await this.userDao.addOrMerge(user.dbUserEntry)
        return new SertaUser(user.discordUser, dbUserEntry)
    }
}