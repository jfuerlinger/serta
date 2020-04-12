import {UserService} from "../../services/user-service";
import {StatusInformation} from "./status-message-layouter";

export class StatusReporter {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService
    }

    async getStatus(discordUserName: string): Promise<StatusInformation> {
        const sertaUser = await this.userService.getByDiscordUserName(discordUserName)
        return {
            name: sertaUser.discordUserName,
            avatar_url: sertaUser.avatarUrl,
            levelId: sertaUser.levelId,
            immunizationLevel: sertaUser.immuneLevel
        }
    }
}