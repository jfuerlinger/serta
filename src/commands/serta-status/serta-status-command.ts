import {CommandClient, Message, TextChannel, User} from "eris";
import {SertaCommand} from "../serta-command";
import {StatusReporter} from "./status-reporter";
import {SertaUserService} from "../../services/serta-user-service";
import {TableStorageUserDao} from "../../dao/table-storage/table-storage-user-dao";
import {StatusMessageLayouter} from "./status-message-layouter";

export class SertaStatusCommand extends SertaCommand {
    constructor(commandClient: CommandClient) {
        super(commandClient)
    }

    private userService?: SertaUserService

    async execute(msg: Message, args: any): Promise<void> {
        if (msg.channel instanceof TextChannel) {
            this.setupSertaUserService(msg.channel as TextChannel);
            if (SertaStatusCommand.somebodyIsMentionedIn(msg)) {
                this.reportStatusForMentions(msg.mentions, msg.channel.id);
            } else {
                await this.reportStatusForAllUsers(msg.channel.id)
            }
        }
    }

    private setupSertaUserService(channel: TextChannel): void {
        this.userService = new SertaUserService(this._bot, new TableStorageUserDao(channel.guild.id))
    }

    private async reportStatusForAllUsers(channelId: string) {
        if (this.userService) {
            const allUsers = await this.userService.getAll()
            allUsers.forEach(async user => {
                await this.reportStatus(user.discordUserName, channelId)
            })
        }
    }

    private reportStatusForMentions(users: User[], channelId: string) {
        users.forEach(async user => {
            await this.reportStatus(user.username, channelId);
        })
    }

    private async reportStatus(discordUserName: string, channelId: string) {
        const statusMessage = await this.getStatusMessage(discordUserName);
        if (statusMessage)
            this.createInfoMessage(channelId, {embed: statusMessage})
    }

    private async getStatusMessage(discordUserName: string) {
        if (this.userService) {
            const reporter = new StatusReporter(this.userService)
            const info = await reporter.getStatus(discordUserName)
            if (info) {
                return StatusMessageLayouter.getLayout(info);
            }
        }
    }
}