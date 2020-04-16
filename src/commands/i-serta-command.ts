import {CommandClient, Message, MessageContent} from "eris";

export interface ISertaCommand {
    execute(msg: Message, args: any) : void;
}