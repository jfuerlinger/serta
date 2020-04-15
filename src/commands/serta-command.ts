import {CommandClient, Message, MessageContent} from "eris";

export abstract class SertaCommand {
    protected readonly _bot: CommandClient

    constructor(commandClient: CommandClient) {
        this._bot = commandClient
    }

    abstract execute(msg: Message, args: any) : void;

    protected static somebodyIsMentionedIn(msg: Message): boolean {
        return msg.mentions.length > 0;
    }

    protected createInfoMessage(channelId: string, message: MessageContent): void {
        this._bot.createMessage(channelId, message)
    }

    protected createErrorMessage(channelId: string, message: MessageContent): void {
        this._bot.createMessage(channelId, `ERROR: ${message}`)
    }
}