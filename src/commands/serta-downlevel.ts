
import { SertaUtils } from "../utils/serta-utils";

import { SertaCommand } from "./serta-command";
import { Message, CommandClient } from "eris";

export class SertaDownLevelCommand extends SertaCommand {

    constructor(bot: CommandClient) {
        super(bot)
    }

    execute(msg: Message, args: any) {
        SertaUtils.logDetails(msg, args);

        if (!SertaDownLevelCommand.somebodyIsMentionedIn(msg)) {
            this.createErrorMessage(msg.channel.id, `You have to mention at least one player to level-down!`)
            return;
        }
        const levelNotToBeChanged = 0;
        const changeLevelAction = (levelIndex: number) => SertaUtils.getPrevLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the lowest levelName!"
        SertaUtils.changeLevelOfMentionedUsersIn(this._bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible)
    }
}

