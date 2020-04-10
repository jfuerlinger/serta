import {CommandClient} from "eris";
import {SertaCommand} from "../serta-command";
import * as Eris from "eris";
import {SertaUtils} from "../../utils/serta-utils";

export class SertaStatusCommand implements SertaCommand {
    constructor(commandClient: CommandClient) {

    }

    execute(msg: Eris.Message, args: any): void {
        SertaUtils.createInfoMessage(0, 0, msg)
    }
}