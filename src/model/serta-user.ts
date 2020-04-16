import { User } from "eris";
import { DbUserEntry } from "./db-user-entry";
import { ISertaUser } from "./i-serta-user";

export class SertaUser implements ISertaUser {

    private discordUser: User;
    private dbUserEntry: DbUserEntry

    get discordUserId(): string { return this.discordUser.id }
    get discordUserName(): string { return this.discordUser.username }
    get avatarUrl(): string { return this.discordUser.avatarURL }

    get levelId(): number { return this.dbUserEntry.levelId; }
    set levelId(levelId: number) { this.dbUserEntry.levelId = levelId; }

    get immuneLevel(): number { return this.dbUserEntry.immuneLevel }
    get experiencePoints(): number | undefined { return this.dbUserEntry.experiencePoints }
    get isBot(): boolean { return this.discordUser.bot; }

    get DbUserEntry(): DbUserEntry { return this.dbUserEntry; }

    constructor(
        discordUser: User,
        userFromDb: DbUserEntry) {
        this.discordUser = discordUser;
        this.dbUserEntry = userFromDb;
    }
}
