import { UserService } from "./user-service";
import { User, CommandClient } from "eris";
import { SertaUser } from "../model/serta-user";
import { TableStorageUserDao } from "../dao/table-storage/table-storage-user-dao";
import { DbUserEntry } from "../model/db-user-entry";
import { UserDao } from "../dao/user-dao";

const createLogger = require('logging').default;
const logger = createLogger('serta-user-service');


export class SertaUserService implements UserService {

    private _bot: CommandClient;
    private _userDao : UserDao

    constructor(
        bot: CommandClient,
        userDao: UserDao) {
        this._bot = bot;
        this._userDao = userDao;
    }

    public async GetUsers(guildId: string): Promise<SertaUser[]> {

        // const dao = new TableStorageUserDao(guildId);
        return new Promise<SertaUser[]>(async (resolve, reject) => {

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