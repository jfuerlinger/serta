import {UserService} from "../../services/user-service";
import {StatusInformation} from "./status-message-layouter";
import {TimeSpanFormatter} from "./time-span-formatter";
import {ConfigurationBuilder} from "../../config/configuration-builder";

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
            const timespanForMedication = ConfigurationBuilder.getConfiguration().gameLevelInformation.getLevelInformation(sertaUser.levelId).timeSpanForMedication
            nextMedicationDue.setHours(nextMedicationDue.getHours() + timespanForMedication)
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