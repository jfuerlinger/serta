import { SertaUtils } from "../utils/serta-utils";
import { SertaCommandBase } from "./serta-command-base";

export class SertaDownLevelCommand extends SertaCommandBase {

    onCommandCalled(msg: any, args: any): void {

        SertaUtils.logDetails(msg, args);

        if (!SertaDownLevelCommand.somebodyIsMentionedIn(msg)) {
            this.createErrorMessage(msg.channel.id, `You have to mention at least one player to level-down!`)
            return;
        }
        const levelNotToBeChanged = 0;
        const changeLevelAction = (levelIndex: number) => SertaUtils.getPrevLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the lowest levelName!"
        SertaUtils.changeLevelOfMentionedUsersIn(this.getUserService(msg.channel.guild.id),
            this.bot, msg,
            levelNotToBeChanged,
            changeLevelAction,
            warningMessageIfImpossible)
    }
}

