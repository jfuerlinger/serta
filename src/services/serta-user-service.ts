import {UserService} from "./user-service";
import {CommandClient, User} from "eris";
import {SertaUser} from "../model/serta-user";
import {UserDao} from "../dao/user-dao";
import {DbUserEntry} from "../model/db-user-entry";

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

    public async get(userId: string): Promise<SertaUser> {
        return new Promise<SertaUser>(async (resolve, reject) => {
            await this.getUserAndClearPromise(userId, resolve, reject);
        })
    }

    private async getUserAndClearPromise(
        userId: string,
        resolve: (user: SertaUser) => void,
        reject: (reason: string) => void): Promise<void> {
        const botUser = this.getDiscordUser(userId)
        if (botUser) {
            const daoUser = await this.getDaoUser(userId)
            let user = this.assembleSertaUser(daoUser, botUser);
            resolve(user)
        } else {
            reject("Discord user not found")
        }
    }

    private getDiscordUser(userId: string): User | undefined {
        return this._bot.users.get(userId);
    }

    private async getDaoUser(userId: string): Promise<DbUserEntry> {
        return await this._userDao.getById(userId);
    }

    private assembleSertaUser(daoUser: DbUserEntry, botUser: User): SertaUser {
        let user: SertaUser
        if (daoUser) {
            const level = daoUser.levelId
            user = new SertaUser(botUser, level)
        } else {
            this._userDao.add(new DbUserEntry(botUser.id, 1))
            user = new SertaUser(botUser, 1)
        }
        return user;
    }

    public async GetUsers(guildId: string): Promise<SertaUser[]> {

        // const dao = new TableStorageUserDao(guildId);
        return new Promise<SertaUser[]>(async (resolve) => {

            let result = this._bot.users.map(async (erisUser) => {

                try {
                    let dbUser = await this._userDao.getById(erisUser.id);
                    if (dbUser) {
                        return new SertaUser(erisUser, dbUser.levelId);
                    }
                } catch (error) {
                    logger.warn(error);
                }

                return new SertaUser(erisUser, undefined);
            });

            let debuggerHint = await Promise.all(result);
            resolve(debuggerHint);

        });


    }

}