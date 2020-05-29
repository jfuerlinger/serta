import {DbUserEntry} from "./db-user-entry";
import {User} from "eris";

export interface ISertaUser {
    readonly discordUserId: string
    readonly discordUserName: string
    readonly avatarUrl: string
    levelId: number
    readonly immuneLevel: number
    readonly approvedExperiencePoints?: number
    timestampOfLastInfection?: Date
    readonly isBot: boolean

    readonly dbUserEntry: DbUserEntry
    readonly discordUser: User
}