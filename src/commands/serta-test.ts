
import { SertaUtils } from "../utils/serta-utils";

import { SertaCommand } from "./serta-command";
import { SertaUserService } from "../services/serta-user-service";
import { TableStorageUserDao } from "../dao/table-storage/table-storage-user-dao";
import { UserDao } from "../dao/user-dao";

const createLogger = require('logging').default;
createLogger('SertaTestCommand');
export class SertaTestCommand extends SertaCommand {

    constructor(bot: any) {
        super(bot)
    }

    async execute(msg: any, args: any) {
        SertaUtils.logDetails(msg, args);

        const guildId: string = msg.channel.guild.id;
        const userDao : UserDao = new TableStorageUserDao(guildId);

        const userSvc = new SertaUserService(this._bot, userDao);
        let users = await userSvc.getAll();
        SertaUtils.createInfoMessage(this._bot, msg.channel.id, `Fetched ${users.length} users.`);
    }
}

