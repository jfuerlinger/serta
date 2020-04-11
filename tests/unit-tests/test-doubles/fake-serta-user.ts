import {ISertaUser} from "../../../src/model/ISertaUser";

export class FakeSertaUser implements ISertaUser {
    readonly discordUserId: string;
    readonly discordUserName: string;
    readonly experiencePoints: number;
    readonly immuneLevel: number;
    readonly levelId: number;

    constructor(id: string, userName: string, levelId: number, xp: number, immuneLevel: number) {
        this.discordUserId = id
        this.discordUserName = userName
        this.levelId = levelId
        this.immuneLevel = immuneLevel
        this.experiencePoints = xp
    }
}