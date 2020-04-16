import {ISertaUser} from "../model/i-serta-user";

export interface IUserService {
    getByDiscordUserId(discordUserId: string): Promise<ISertaUser>;
    getByDiscordUserName(discordUserName: string): Promise<ISertaUser>;
    getAll() : Promise<ISertaUser[]>;
    update(user: ISertaUser) : Promise<void>;
}