import { SertaUser } from "../model/serta-user";

export interface UserService {
    getByDiscordUserId(discordUserId: string): Promise<SertaUser>
    getAll() : Promise<SertaUser[]>
}