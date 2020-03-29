import { User } from "eris";
import { SertaUser } from "../model/serta-user";

export interface UserService {
    GetUsers(guildId: string) : Promise<SertaUser[]>
}