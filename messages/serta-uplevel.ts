import {SertaUtils} from "../utils/serta-utils";

import { SertaCommand } from "./serta-command";
import { Message, CommandClient } from "eris";

export class SertaUpLevelCommand implements SertaCommand {

    private _bot: CommandClient;

    constructor(bot: any) {
        this._bot = bot;
    }

    execute(msg : Message, args: any) {
        SertaUtils.logDetails(msg, args);

        if (!SertaUtils.somebodyIsMentionedIn(this._bot, msg, `You have to mention at least one player to level-up!`)) {
            return;
        }
        const levelNotToBeChanged = SertaUtils.getMaxLevel()
        const changeLevelAction = (levelIndex:number) => SertaUtils.getNextLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the highest level!"
        SertaUtils.changeLevelOfMentionedUsersIn(this._bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible)
    }
}
