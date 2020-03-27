const StorageUtils = require('../utils/storage-utils');
const SertaUtils = require('../utils/serta-utils');

class SertaStatisticsCommand {

    constructor(bot) {
        this.bot = bot;
    }

    async performCommand(msg, args) {
      let localStorage = await StorageUtils.getState();

      localStorage.map(entry => {
  
        SertaUtils.createInfoMessage(this.bot, msg.channel.id, {
              embed: {
                  title: "Status", // Title of the embed
                  description: entry.message,
                  author: { // Author property
                      name: entry.username,
                      icon_url: entry.avatarURL
                  },
                  color: entry.color ? entry.color : 0x008000, // Color, either in hex (show), or a base-10 integer
                  fields: [
                      {
                          name: "Level",
                          value: entry.level ? entry.level.name : SertaUtils.getDefaultLevel().name,
                          inline: true
                      },
                      {
                          name: "Level Id",
                          value: entry.level ? entry.level.id : SertaUtils.getDefaultLevel().id,
                          inline: true
                      },
                      {
                          name: "Health",
                          value: entry.health,
                          inline: true
                      },
                      {
                          name: "XP",
                          value: entry.experience,
                          inline: false
                      }
  
                  ],
                  footer: { // Footer text
                      text: "HTL Leonding"
                  }
              }
          });
      });
      
    }
}

module.exports = SertaStatisticsCommand;
