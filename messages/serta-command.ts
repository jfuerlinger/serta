import { Message } from "eris";

export interface SertaCommand {
    execute(msg: Message, args: any) : void;
}