import { Message, TextChannel, User } from "eris";
import { SertaUtils } from "../../utils/serta-utils";
import { StatusReporter } from "./status-reporter";
import { SertaUserService } from "../../services/serta-user-service";
import { StatusMessageLayouter } from "./status-message-layouter";
import { SertaCommandBase } from "../serta-command-base";

export class SertaStatusCommand extends SertaCommandBase {

    private userService?: SertaUserService

    async onCommandCalled(msg: Message, args: any): Promise<void> {
        if (msg.channel instanceof TextChannel) {
            this.setupSertaUserService(msg);
            if (SertaStatusCommand.somebodyIsMentionedIn(msg)) {
                this.reportStatusForMentions(msg.mentions, msg.channel.id);
            } else {
                await this.reportStatusForAllUsers(msg.channel.id);
            }
        }
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

    private static somebodyIsMentionedIn(msg: Message): boolean {
        return msg.mentions.length > 0;
    }

    private setupSertaUserService(msg: Message): void {
        const textChannel = msg.channel as TextChannel
        this.userService = new SertaUserService(this.bot, this.getUserDao(textChannel.guild.id))
    }

    private async reportStatus(discordUserName: string, channelId: string) {
        const statusMessage = await this.getStatusMessage(discordUserName);
        if (statusMessage)
            SertaUtils.createInfoMessage(this.bot, channelId, { embed: statusMessage })
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