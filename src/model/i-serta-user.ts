export interface ISertaUser {
    readonly discordUserId: string
    readonly discordUserName: string
    readonly avatarUrl: string
    levelId: number
    readonly immuneLevel: number
    readonly approvedExperiencePoints?: number
    timestampOfLastInfection?: Date
    readonly isBot: boolean
}