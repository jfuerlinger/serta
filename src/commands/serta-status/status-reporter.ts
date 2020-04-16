import { IUserService } from "../../services/i-user-service";
import { StatusInformation } from "./status-message-layouter";
import { TimeSpanFormatter } from "./time-span-formatter";
import { ConfigurationBuilder } from "../../config/configuration-builder";
import { ISertaUser } from "../../model/i-serta-user";

export class StatusReporter {
    private userService: IUserService
    constructor(userService: IUserService) {
        this.userService = userService
    }

    async getStatus(discordUserName: string): Promise<StatusInformation> {
        const sertaUser = await this.userService.getByDiscordUserName(discordUserName)
        if (sertaUser) {
            if (!sertaUser.isBot) {
                const timeTillNextMedication = await StatusReporter.getTimeTillNextMedication(sertaUser);
                const readyToBePromoted = await StatusReporter.getReadyToBePromoted(sertaUser, timeTillNextMedication);

                const config = await ConfigurationBuilder.getConfiguration();

                return {
                    name: sertaUser.discordUserName,
                    avatar_url: sertaUser.avatarUrl,
                    levelId: sertaUser.levelId,
                    levelName: config.gameLevelInformation.getLevelInformation(sertaUser.levelId).name,
                    immunizationLevel: sertaUser.immuneLevel,
                    timeTillNextMedication: timeTillNextMedication,
                    readyToBePromoted: readyToBePromoted,
                    messageOfTheDay: config.messageOfTheDayProvider.getMessage(sertaUser.levelId).text
                }
            } else {
                return new Promise<StatusInformation>(resolve => {
                    resolve()
                })
            }
        } else {
            return new Promise<StatusInformation>(resolve => {
                resolve()
            })
        }
    }

    private static async getReadyToBePromoted(sertaUser: ISertaUser, timeTillNextMedication?: string): Promise<boolean> {
        
        let readyToBePromoted = false
        
        if (!timeTillNextMedication) {
            const config = await ConfigurationBuilder.getConfiguration();
            readyToBePromoted = sertaUser.immuneLevel >= config.gameLevelInformation.getLevelInformation(sertaUser.levelId).maximumImmuneLevel
        }
        return readyToBePromoted;
    }

    private static async getTimeTillNextMedication(sertaUser: ISertaUser): Promise<string | undefined> {
        
        const nextMedicationDue = sertaUser.timestampOfLastInfection
        let timeTillNextMedication
        
        if (nextMedicationDue) {
            const config = await ConfigurationBuilder.getConfiguration();
            const levelConfig = await config.gameLevelInformation.getLevelInformation(sertaUser.levelId);
            const timespanForMedication = levelConfig.timeSpanForMedication
            nextMedicationDue.setHours(nextMedicationDue.getHours() + timespanForMedication)
            timeTillNextMedication = TimeSpanFormatter.format(nextMedicationDue.valueOf() - Date.now())
        }
        return timeTillNextMedication;
    }
}