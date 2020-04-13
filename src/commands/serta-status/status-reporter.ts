import {UserService} from "../../services/user-service";
import {StatusInformation} from "./status-message-layouter";
import {TimeSpanFormatter} from "./time-span-formatter";

export class StatusReporter {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService
    }

    async getStatus(discordUserName: string): Promise<StatusInformation> {
        const sertaUser = await this.userService.getByDiscordUserName(discordUserName)
        const nextMedicationDue = sertaUser.timestampOfLastInfection
        let timeTillNextMedication = ""
        if (nextMedicationDue) {
            nextMedicationDue.setHours(nextMedicationDue.getHours() + 24)
            timeTillNextMedication = TimeSpanFormatter.format(nextMedicationDue.valueOf() - Date.now())
        }
        return {
            name: sertaUser.discordUserName,
            avatar_url: sertaUser.avatarUrl,
            levelId: sertaUser.levelId,
            immunizationLevel: sertaUser.immuneLevel,
            timeTillNextMedication: timeTillNextMedication
        }
    }
}