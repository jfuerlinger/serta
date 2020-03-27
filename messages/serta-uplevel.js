const SertaUtils = require('../utils/serta-utils');

class SertaUpLevelCommand {

    constructor(bot) {
        this.bot = bot;
    }

    performCommand(msg, args) {
        SertaUtils.logDetails(msg,args);

        if (!SertaUtils.somebodyIsMentionedIn(this.bot, msg, `You have to mention at least one player to level-up!`)) {
            return;
        }
        const levelNotToBeChanged = SertaUtils.getMaxLevel()
        const changeLevelAction = (levelIndex) => SertaUtils.getNextLevel(levelIndex)
        const warningMessageIfImpossible = "is already in the highest level!"
        SertaUtils.changeLevelOfMentionedUsersIn(this.bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible)
    }
}

module.exports = SertaUpLevelCommand;