import { UserService } from "./user-service";
import { User, CommandClient } from "eris";
import { SertaUser } from "../model/serta-user";

export class SertaUserService implements UserService {

    private _bot: CommandClient;

    constructor(bot: CommandClient) {
        this._bot = bot;
    }

    public GetUsers(): SertaUser[] {
        return this._bot.users.map((erisUser) => {
            let result : SertaUser = new SertaUser(erisUser, 0);
            return result;
        });
    }

}