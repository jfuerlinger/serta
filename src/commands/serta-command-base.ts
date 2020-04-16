import { ISertaCommand } from "./i-serta-command";
import { Message, CommandClient } from "eris";
import { ISettingResolver } from "../config/i-setting-resolver";
import { IUserDao } from "../dao/i-user-dao";
import { AzureUtils } from "../utils/azure-utils";
import { TableStorageUserDao } from "../dao/table-storage/table-storage-user-dao";
import { IUserService } from "../services/i-user-service";
import { SertaUserService } from "../services/serta-user-service";

export abstract class SertaCommandBase implements ISertaCommand {

    constructor(
        protected readonly settingResolver: ISettingResolver,
        protected readonly bot: CommandClient) { }

    execute(msg: Message, args: any): void {
        this.onCommandCalled(msg, args);
    }

    abstract onCommandCalled(msg: Message, args: any): void;

    protected getUserDao(guildId: string): IUserDao {
        return AzureUtils.getUserDao(guildId);
    }

    protected getUserService(guildId: string) : IUserService {
        return new SertaUserService(this.bot, this.getUserDao(guildId));
    }
}