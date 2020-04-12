export interface ISertaUser {
    readonly discordUserId: string
    readonly discordUserName: string
    readonly avatarUrl: string
    readonly levelId?: number
    readonly immuneLevel?: number
    readonly experiencePoints?: number
}