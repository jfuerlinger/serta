import {UserService} from "./user-service";
import {CommandClient} from "eris";
import {SertaUser} from "../model/serta-user";
import {UserDao} from "../dao/user-dao";

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
            const botUser = this._bot.users.get(userId)
            if (botUser) {
                const daoUser = await this._userDao.getById(userId)
                if (daoUser) {
                    const level = daoUser.levelId
                    const user = new SertaUser(botUser, level)
                    resolve(user)
                } else {
                    resolve(new SertaUser(botUser, 5))
                }
            } else {
                reject("user not found")
            }
        })
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