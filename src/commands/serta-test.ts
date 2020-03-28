
import { SertaUtils } from "../utils/serta-utils";

import { SertaCommand } from "./serta-command";
import { Message, CommandClient } from "eris";
import { DbService } from "../services/db-service";
import { SertaDbService } from "../services/serta-db-service";
import { DbEntry } from "../model/db-entry";

const createLogger = require('logging').default;
const logger = createLogger('SertaTestCommand');


export class SertaTestCommand implements SertaCommand {

    private _bot: CommandClient;

    constructor(bot: any) {
        this._bot = bot;
    }

    execute(msg: Message, args: any) {
        SertaUtils.logDetails(msg, args);

        const dbSvc: DbService = new SertaDbService();
        dbSvc.GetAll('1234')
            .then((dbEntries: DbEntry[]) => {
                logger.info('success');
            })
            .catch((error) => logger.error(error));
    }
}

