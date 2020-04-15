import {SertaUtils} from "../utils/serta-utils";

import {SertaCommand} from "./serta-command"
import {Message} from "eris"

export class SertaUpLevelCommand extends SertaCommand {

    constructor(bot: any) {
        super(bot)
    }

    execute(msg : Message, args: any) {
        SertaUtils.logDetails(msg, args);

        if (!SertaUtils.somebodyIsMentionedIn(this._bot, msg, `You have to mention at least one player to level-up!`)) {
            return;
        }
        const levelNotToBeChanged = SertaUtils.getMaxLevel()
        const changeLevelAction = (levelIndex:number) => SertaUtils.getNextLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the highest levelName!"
        SertaUtils.changeLevelOfMentionedUsersIn(this._bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible)
    }
}
