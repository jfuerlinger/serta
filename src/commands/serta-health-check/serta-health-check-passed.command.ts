import {SertaCommandBase} from "../serta-command-base";
import {CommandClient, Message} from "eris";
import {ISettingResolver} from "../../config/i-setting-resolver";
import {IUserLevelChanger} from "./i-user-level-changer";
import {IMessage} from "../../infrastructure/i-message";
import {SertaMessage} from "../../infrastructure/serta-message";

export class SertaHealthCheckPassedCommand extends SertaCommandBase {
    constructor(settingResolver: ISettingResolver,
                commandClient: CommandClient,
                userLevelChanger: IUserLevelChanger,
                command: string) {
        super(settingResolver, commandClient, command);
    }

    onCommandCalled(msg: IMessage, args: any): void {
        if (msg instanceof SertaMessage) {
            const sertaMessage = msg as SertaMessage
            const erisMessage = msg.erisMessage as Message
        }
    }

}