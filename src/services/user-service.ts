import {ISertaUser} from "../model/ISertaUser";

export interface UserService {
    getByDiscordUserId(discordUserId: string): Promise<ISertaUser>
    getByDiscordUserName(discordUserName: string): Promise<ISertaUser>
    getAll() : Promise<ISertaUser[]>
}