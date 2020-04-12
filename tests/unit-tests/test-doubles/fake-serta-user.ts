import {ISertaUser} from "../../../src/model/ISertaUser";

export class FakeSertaUser implements ISertaUser {
    readonly discordUserId: string;
    readonly discordUserName: string;
    readonly avatarUrl: string;
    readonly experiencePoints: number;
    readonly immuneLevel: number;
    readonly levelId: number;

    constructor(id: string, userName: string, avatarUrl: string, levelId: number, xp: number, immuneLevel: number) {
        this.discordUserId = id
        this.discordUserName = userName
        this.avatarUrl = avatarUrl
        this.levelId = levelId
        this.immuneLevel = immuneLevel
        this.experiencePoints = xp
    }
}