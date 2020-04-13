import {UserService} from "../../services/user-service";
import {StatusInformation} from "./status-message-layouter";
import {TimeSpanFormatter} from "./time-span-formatter";
import {ConfigurationBuilder} from "../../config/configuration-builder";
import {ISertaUser} from "../../model/i-serta-user";

export class StatusReporter {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService
    }

    async getStatus(discordUserName: string): Promise<StatusInformation> {
        const sertaUser = await this.userService.getByDiscordUserName(discordUserName)
        let timeTillNextMedication = StatusReporter.getTimeTillNextMedication(sertaUser);
        return {
            name: sertaUser.discordUserName,
            avatar_url: sertaUser.avatarUrl,
            levelId: sertaUser.levelId,
            immunizationLevel: sertaUser.immuneLevel,
            timeTillNextMedication: timeTillNextMedication,
            readyToBePromoted: sertaUser.immuneLevel >= ConfigurationBuilder.getConfiguration().gameLevelInformation.getLevelInformation(sertaUser.levelId).maximumImmuneLevel
        }
    }

    private static getTimeTillNextMedication(sertaUser: ISertaUser): string {
        const nextMedicationDue = sertaUser.timestampOfLastInfection
        let timeTillNextMedication = ""
        if (nextMedicationDue) {
            const timespanForMedication = ConfigurationBuilder.getConfiguration().gameLevelInformation.getLevelInformation(sertaUser.levelId).timeSpanForMedication
            nextMedicationDue.setHours(nextMedicationDue.getHours() + timespanForMedication)
            timeTillNextMedication = TimeSpanFormatter.format(nextMedicationDue.valueOf() - Date.now())
        }
        return timeTillNextMedication;
    }
}