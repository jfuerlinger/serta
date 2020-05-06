import {SertaCommandBase} from "../serta-command-base";
import {CommandClient, Message} from "eris";
import {ISettingResolver} from "../../config/i-setting-resolver";
import {IUserLevelChanger} from "./i-user-level-changer";

export class SertaHealthCheckPassedCommand extends SertaCommandBase{
    constructor(settingResolver: ISettingResolver,
                commandClient: CommandClient,
                userLevelChanger: IUserLevelChanger,
                command: string) {
        super(settingResolver, commandClient, command);
    }

    onCommandCalled(msg: Message, args: any): void {
    }

}