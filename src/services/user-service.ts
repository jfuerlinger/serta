import { SertaUser } from "../model/serta-user";

export interface UserService {
    getByDiscordUserId(discordUserId: string): Promise<SertaUser>
    getByDiscordUserName(discordUserName: string): Promise<SertaUser>
    getAll() : Promise<SertaUser[]>
}