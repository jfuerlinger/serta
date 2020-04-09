import {SertaCommand} from "./serta-command";

import {SertaUtils} from "../utils/serta-utils";
import {Message, CommandClient} from "eris";

export class SertaStatisticsCommand implements SertaCommand {

    private readonly _bot: CommandClient;

    constructor(bot: CommandClient) {
        this._bot = bot;
    }

    async execute(msg: Message, args: any) {
        const generalInfo = {
            title: "Status", // Title of the embed
            description: "He is still a bit milk-born but increases.\nKeep our fingers crossed",
            thumbnail: {
                url: "https://cdn.discordapp.com/embed/avatars/4.png",
                height: 2,
                width: 2
            },
            author: { // Author property
                name: "Da Joe",
                icon_url: "https://cdn.discordapp.com/avatars/509427140832526336/b9e7a194f8ca9adf14ee77e894409d1a.jpg?size=128"
            },
            color: 0xEB261F, // Color, either in hex (show), or a base-10 integer
            fields: [
                {
                    name: "Level",
                    value: "Loops",
                    inline: true
                },
                {
                    name: "Immune Level",
                    value: "35 %",
                    inline: true
                },
                {
                    name: "Ready to be\nPromoted",
                    value: "yes",
                    inline: true
                }
            ],
            footer: { // Footer text
                text: "INFECTION ALERT!! You have 3h 24m 10s left to get a medication"
            }
        }
        SertaUtils.createInfoMessage(this._bot, msg.channel.id, { embed: generalInfo })

        // https://cdn.discordapp.com/embed/avatars/4.png
        // https://cdn.discordapp.com/avatars/509427140832526336/b9e7a194f8ca9adf14ee77e894409d1a.jpg?size=128
        // https://cdn.discordapp.com/avatars/688098052933681249/00a6b82c042fa7d58c02e746d9c1aee6.jpg?size=128

        // let localStorage = await StorageUtils.getState()
        //
        // localStorage.map((entry: any) => {
        // })
    }
}

//     SertaUtils.createInfoMessage(this._bot, msg.channel.id, {
//         embed: {
//             title: "Status", // Title of the embed
//             description: entry.message,
//             author: { // Author property
//                 name: entry.username,
//                 icon_url: entry.avatarURL
//             },
//             color: entry.color ? entry.color : 0x008000, // Color, either in hex (show), or a base-10 integer
//             fields: [
//                 {
//                     name: "Level",
//                     value: entry.levelName ? entry.levelName.name : SertaUtils.getDefaultLevel().name,
//                     inline: true
//                 },
//                 {
//                     name: "Level Id",
//                     value: entry.levelName ? entry.levelName.id : SertaUtils.getDefaultLevel().id,
//                     inline: true
//                 },
//                 {
//                     name: "Health",
//                     value: entry.health,
//                     inline: true
//                 },
//                 {
//                     name: "XP",
//                     value: entry.experience,
//                     inline: false
//                 }
//
//             ],
//             footer: { // Footer text
//                 text: "HTL Leonding"
//             }
//         }
//     });
// });
// }
