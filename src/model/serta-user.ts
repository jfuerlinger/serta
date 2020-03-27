import { User } from "eris";

export class SertaUser {

    private _levelId: number;
    private _discordUser : User;

    get discordUser(): User { return this.discordUser; }
    get levelId(): number { return this._levelId; }

    constructor(
        discordUser: User,
        levelId: number) {
            this._discordUser = discordUser;
            this._levelId = levelId;
        }

}