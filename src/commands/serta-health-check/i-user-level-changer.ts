import {ISertaUser} from "../../model/i-serta-user";

export interface IUserLevelChanger {
    upLevelIsPossible(user: ISertaUser): boolean
    upLevel(user: ISertaUser): void
    downLevelIsPossible(user: ISertaUser): boolean
    downLevel(user: ISertaUser): void
}