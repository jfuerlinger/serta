import { ISertaCommand } from "./i-serta-command";
import { Message, CommandClient, MessageContent } from "eris";
import { ISettingResolver } from "../config/i-setting-resolver";
import { IUserDao } from "../dao/i-user-dao";
import { AzureUtils } from "../utils/azure-utils";
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

    protected static somebodyIsMentionedIn(msg: Message): boolean {
        return msg.mentions.length > 0;
    }

    protected createInfoMessage(channelId: string, message: MessageContent): void {
        this.bot.createMessage(channelId, message)
    }

    protected createErrorMessage(channelId: string, message: MessageContent): void {
        this.bot.createMessage(channelId, `ERROR: ${message}`)
    }
}