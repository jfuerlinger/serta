import {ISertaUser} from "../../../model/i-serta-user";

export class FakeSertaUser implements ISertaUser {
    readonly discordUserId: string
    readonly discordUserName: string
    readonly avatarUrl: string
    readonly approvedExperiencePoints: number
    readonly immuneLevel: number
    readonly levelId: number
    timestampOfLastInfection?: Date
    readonly isBot: boolean

    constructor(id: string, userName: string, avatarUrl: string,
                levelId: number, xp: number, immuneLevel: number,
                timestampOfLastInfection?: Date, isBot?: boolean) {
        this.discordUserId = id
        this.discordUserName = userName
        this.avatarUrl = avatarUrl
        this.levelId = levelId
        this.immuneLevel = immuneLevel
        this.approvedExperiencePoints = xp
        this.timestampOfLastInfection = timestampOfLastInfection
        this.isBot = isBot === true
    }
}