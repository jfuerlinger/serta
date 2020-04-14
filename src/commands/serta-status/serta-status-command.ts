import {CommandClient, Message, TextChannel} from "eris";
import {SertaCommand} from "../serta-command";
import {SertaUtils} from "../../utils/serta-utils";
import {StatusReporter} from "./status-reporter";
import {SertaUserService} from "../../services/serta-user-service";
import {TableStorageUserDao} from "../../dao/table-storage/table-storage-user-dao";
import {StatusMessageLayouter} from "./status-message-layouter";

export class SertaStatusCommand implements SertaCommand {
    private _bot: CommandClient
    constructor(commandClient: CommandClient) {
        this._bot = commandClient
    }

    async execute(msg: Message, args: any): Promise<void> {
        if (msg.channel instanceof TextChannel) {
            const cha = msg.channel as TextChannel
            const userService = new SertaUserService(this._bot, new TableStorageUserDao(cha.guild.id))
            const reporter = new StatusReporter(userService)
            const info = await reporter.getStatus(msg.mentions[0].username)
            const statusMessage = StatusMessageLayouter.getLayout(info)
            console.log(statusMessage);
            // const statusMessage = {
            //     color: 15410719,
            //     title: 'Status',
            //     author:
            //         { name: 'p.bauer',
            //             icon_url:
            //                 'https://cdn.discordapp.com/avatars/509427140832526336/b9e7a194f8ca9adf14ee77e894409d1a.jpg?size=128' },
            //     description: 'This is the start of a long journey. We trust in you',
            //     fields:
            //         [ { name: 'Level', value: 'Loops', inline: true },
            //             { name: 'Immunization Level', value: 0, inline: true }
            //             // undefined // to be fixed!
            //         ],
            //     thumbnail:
            //         { url: 'http://localhost:8000/assets/level-images/s-yellow.png' },
            //     footer: ''
            // }

            SertaUtils.createInfoMessage(this._bot, msg.channel.id, { embed: statusMessage }) //
        }
    }
}