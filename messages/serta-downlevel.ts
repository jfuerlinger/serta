
import { SertaUtils } from "../utils/serta-utils";

import { SertaCommand } from "./serta-command";

export class SertaDownLevelCommand implements SertaCommand {

    private _bot: any;

    constructor(bot: any) {
        this._bot = bot;
    }

    performCommand(msg: any, args: any) {
        SertaUtils.logDetails(msg, args);

        if (!SertaUtils.somebodyIsMentionedIn(this._bot, msg, `You have to mention at least one player to level-down!`)) {
            return;
        }
        const levelNotToBeChanged = 0;
        const changeLevelAction = (levelIndex: number) => SertaUtils.getPrevLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the lowest level!"
        SertaUtils.changeLevelOfMentionedUsersIn(this._bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible)
    }
}

