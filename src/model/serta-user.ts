import { User } from "eris";

export class SertaUser {

    private _levelId: number | undefined;
    private _discordUser : User;

    get discordUser(): User { return this._discordUser; }
    get levelId(): number | undefined { return this._levelId; }

    constructor(
        discordUser: User,
        levelId: number | undefined) {
            this._discordUser = discordUser;
            this._levelId = levelId;
        }

}
