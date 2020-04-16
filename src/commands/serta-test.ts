
import { SertaUtils } from "../utils/serta-utils";

import { SertaUserService } from "../services/serta-user-service";
import { SertaCommandBase } from "./serta-command-base";

const createLogger = require('logging').default;
createLogger('SertaTestCommand');

export class SertaTestCommand extends SertaCommandBase {
    
    async onCommandCalled(msg: any, args: any): Promise<void> {

        SertaUtils.logDetails(msg, args);

        const guildId: string = msg.channel.guild.id;
        
        const userSvc = new SertaUserService(this.bot, this.getUserDao(guildId));
        let users = await userSvc.getAll();
        SertaUtils.createInfoMessage(this.bot, msg.channel.id, `Fetched ${users.length} users.`);
    }
}

