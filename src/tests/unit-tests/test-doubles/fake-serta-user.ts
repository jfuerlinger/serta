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

export const fakeSertaUsers: FakeSertaUser[] = [
    new FakeSertaUser("some.discord.id.1", "jfuerlinger", "https://a.server/jf.png", 0, 50, 9),
    new FakeSertaUser("some.discord.id.2", "p.bauer", "https://a.server/pb.png", 0, 50, 10),
    new FakeSertaUser("some.discord.id.3", "PewPewPew", "https://a.server/pe.png", 0, 50, 11),
    new FakeSertaUser("some.discord.id.4", "LebenderFux", "https://a.server/lf.png", 1, 50, 20)
]