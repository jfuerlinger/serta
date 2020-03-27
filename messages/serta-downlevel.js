const SertaUtils = require('../utils/serta-utils');

class SertaDownLevelCommand {

    constructor(bot) {
        this.bot = bot;
    }

    performCommand(msg, args) {
        SertaUtils.logDetails(msg,args);

        if (!SertaUtils.somebodyIsMentionedIn(this.bot, msg, `You have to mention at least one player to level-down!`)) {
            return;
        }
        const levelNotToBeChanged = 0;
        const changeLevelAction = (levelIndex) => SertaUtils.getPrevLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the lowest level!"
        SertaUtils.changeLevelOfMentionedUsersIn(this.bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible)
    }
}

module.exports = SertaDownLevelCommand;