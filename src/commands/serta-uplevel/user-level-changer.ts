import {LevelInformation} from "../../config/game-level-information";
import {ISertaUser} from "../../model/i-serta-user";

export class UserLevelChanger {
    private levelInformation: LevelInformation[]

    constructor(levelInformation: LevelInformation[]) {
        this.levelInformation = levelInformation
    }

    upLevelIsPossible(user: ISertaUser): boolean {
        return this.levelInformation[user.levelId].maximumImmuneLevel <= user.immuneLevel
    }

    upLevel(user: ISertaUser): void {
        if (this.upLevelIsPossible(user)) {
            user.levelId++
        }
    }
}