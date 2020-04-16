import { SertaUtils } from "../utils/serta-utils";

import { SertaCommandBase } from "./serta-command-base";

export class SertaUpLevelCommand extends SertaCommandBase {

    onCommandCalled(msg: any, args: any): void {

        SertaUtils.logDetails(msg, args);

        if (!SertaUpLevelCommand.somebodyIsMentionedIn(msg)) {
            this.createErrorMessage(msg.channel.id, `You have to mention at least one player to level-up!`)
            return;
        }
        
        const levelNotToBeChanged = SertaUtils.getMaxLevel()
        const changeLevelAction = (levelIndex: number) => SertaUtils.getNextLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the highest levelName!"
        SertaUtils.changeLevelOfMentionedUsersIn(
            this.getUserService(msg.channel.guild.id),
            this.bot, msg, 
            levelNotToBeChanged, 
            changeLevelAction, 
            warningMessageIfImpossible)
    }
}
