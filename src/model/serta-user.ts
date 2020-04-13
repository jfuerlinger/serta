import { User } from "eris";
import {DbUserEntry} from "./db-user-entry";
import {ISertaUser} from "./i-serta-user";

export class SertaUser implements ISertaUser {

    private _discordUser: User;
    private dbUserEntry: DbUserEntry

    get discordUserId(): string { return this._discordUser.id}
    get discordUserName(): string { return this._discordUser.username }
    get avatarUrl(): string { return this._discordUser.avatarURL }
    get levelId(): number { return this.dbUserEntry.levelId; }
    get immuneLevel(): number | undefined { return this.dbUserEntry.immuneLevel }
    get experiencePoints(): number | undefined { return this.dbUserEntry.experiencePoints }

    constructor(
        discordUser: User,
        userDao: DbUserEntry) {
            this._discordUser = discordUser;
            this.dbUserEntry = userDao
        }
}
