import {Message, TextChannel, User} from "eris";
import { StatusReporter } from "./status-reporter";
import { StatusMessageLayouter } from "./status-message-layouter";
import { SertaCommandBase } from "../serta-command-base";
import { IUserService } from "../../services/i-user-service";
import {IMessage} from "../../infrastructure/i-message";
import {SertaMessage} from "../../infrastructure/serta-message";

export class SertaStatusCommand extends SertaCommandBase {

    private userService?: IUserService;

    async onCommandCalled(msg: IMessage, args: any): Promise<void> {
        if (msg  instanceof SertaMessage) {
            const sertaMessage = msg as SertaMessage
            const erisMessage = sertaMessage.erisMessage as Message
            if (erisMessage.channel instanceof TextChannel) {
                this.setupSertaUserService(erisMessage.channel as TextChannel);
                if (SertaStatusCommand.somebodyIsMentionedIn(erisMessage)) {
                    this.reportStatusForMentions(erisMessage.mentions, erisMessage.channel.id);
                } else {
                    await this.reportStatusForAllUsers(erisMessage.channel.id)
                }
            }
        }
    }

    private setupSertaUserService(channel: TextChannel): void {
        this.userService = this.getUserService(channel.guild.id)
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