import { User } from "eris";
import {DbUserEntry} from "./db-user-entry";

export class SertaUser {

    private _discordUser : User;
    private dbUserEntry: DbUserEntry

    get discordUserId(): string { return this._discordUser.id}
    get discordUserName(): string { return this._discordUser.username }
    get levelId(): number | undefined { return this.dbUserEntry.levelId; }
    get immuneLevel(): number | undefined { return this.dbUserEntry.immuneLevel }
    get experiencePoints(): number | undefined { return this.dbUserEntry.experiencePoints }

    constructor(
        discordUser: User,
        userDao: DbUserEntry) {
            this._discordUser = discordUser;
            this.dbUserEntry = userDao
        }

}
