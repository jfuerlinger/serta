import {ISertaMessage} from "../i-serta-message";

export interface ISertaCommand {
    execute(msg: ISertaMessage, args: any) : void;
}