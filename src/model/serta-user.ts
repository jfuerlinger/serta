import {User} from "eris";
import {DbUserEntry} from "./db-user-entry";
import {ISertaUser} from "./i-serta-user";

export class SertaUser implements ISertaUser {

    private _discordUser: User;
    private readonly _dbUserEntry: DbUserEntry

    get discordUserId(): string { return this._discordUser.id}
    get discordUserName(): string { return this._discordUser.username }
    get avatarUrl(): string { return this._discordUser.avatarURL }
    get levelId(): number { return this._dbUserEntry.levelId }
    set levelId(newLevel: number) { this._dbUserEntry.levelId = newLevel }
    get immuneLevel(): number { return this._dbUserEntry.immuneLevel }
    get approvedExperiencePoints(): number | undefined { return this._dbUserEntry.experiencePoints }
    get isBot(): boolean { return this._discordUser.bot }

    get dbUserEntry(): DbUserEntry {
        return this.cloneDbUserEntry();
    }

    private cloneDbUserEntry(): DbUserEntry {
        const js = JSON.stringify(this._dbUserEntry)
        return JSON.parse(js)
    }

    get discordUser(): User { return this._discordUser }

    constructor(
        discordUser: User,
        userFromDb: DbUserEntry) {
        this._discordUser = discordUser;
        this._dbUserEntry = userFromDb;
    }
}
