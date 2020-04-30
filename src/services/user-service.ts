import {ISertaUser} from "../model/i-serta-user";

export interface UserService {
    getByDiscordUserId(discordUserId: string): Promise<ISertaUser>
    getByDiscordUserName(discordUserName: string): Promise<ISertaUser>
    getAll(): Promise<ISertaUser[]>
    put(sertaUser: ISertaUser): Promise<ISertaUser>
}