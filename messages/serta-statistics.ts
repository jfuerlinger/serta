import { SertaCommand } from "./serta-command";

import {StorageUtils} from "../utils/storage-utils";
import {SertaUtils} from "../utils/serta-utils";
import { Message, CommandClient } from "eris";

export class SertaStatisticsCommand implements SertaCommand {

    private _bot: CommandClient;

    constructor(bot: CommandClient) {
        this._bot = bot;
    }

    async execute(msg: Message, args: any) {
        let localStorage = await StorageUtils.getState();

        localStorage.map((entry: any) => {

            SertaUtils.createInfoMessage(this._bot, msg.channel.id, {
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

