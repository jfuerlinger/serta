import {IMessage} from "../infrastructure/i-message";

export interface ISertaCommand {
    execute(msg: IMessage, args: any) : void;
}