import { SertaBot } from "./bot"
import { DbService } from "./services/db-service";
import { SertaDbService } from "./services/serta-db-service";
import { DbEntry } from "./model/db-entry";

const createLogger = require('logging').default;
const logger = createLogger('driver');

const dbService: SertaDbService = new SertaDbService();

let newDbEntry = new DbEntry(1, 0);
newDbEntry.PartitionKey = '1234';
newDbEntry.RowKey = '4';
newDbEntry.levelId=7;


// (async () => {
//     await dbService.AddOrMergeRecord(
//         newDbEntry);
//     console.log("Record added/updated");

//     let record: DbEntry = <DbEntry>await dbService.GetRecord(<string>newDbEntry.PartitionKey, <string>newDbEntry.RowKey);
//     console.log(record.userId);

//      logger.info(await dbService.GetAll('1234'));
//   })();

//   dbService.GetAll('1234')
//     .then((result: DbEntry[]) => {
//         logger.info(result);
//     })
//     .catch((error) => logger.error(error));

const bot = new SertaBot();
bot.run();

