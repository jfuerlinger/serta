// import { SertaBot } from "./bot"
// import { DbService } from "./services/db-service";
// import { SertaDbService } from "./services/serta-db-service";
// import { DbEntry } from "./model/db-user-entry";

import { UserDao } from "./dao/user-dao";
import { TableStorageUserDao } from "./dao/table-storage-user-dao";
import { DbUserEntry } from "./model/db-user-entry";
import { SertaUserService } from "./services/serta-user-service";
import { SertaUser } from "./model/serta-user";
import { SertaBot } from "./bot";

const createLogger = require('logging').default;
const logger = createLogger('driver');

logger.info('test');

const bot = new SertaBot();
bot.run();

// (async () => { 

//     let userSvc = new SertaUserService(bot._bot);
//     let users = userSvc.GetUsers();

// })();


//const random = require('random');

// (async () => {
//     const guildId: string = String(random.int(5000, 1000));
//     const userId: string = String(random.int(1, 10000));
//     const dao: UserDao = new TableStorageUserDao(guildId);

//     const createdUser: DbUserEntry = await dao.add(new DbUserEntry(userId, 5));
//     let fetchedUser: DbUserEntry = await dao.getById(userId);
//     //logger.info(fetchedUser);

//     logger.info(`original userId='${userId}'`);
//     logger.info(`fetched userId='${fetchedUser.RowKey}'`);
//     await dao.deleteById(userId);
//     // await dao.getById(userId)
//     //     .then((xxx) => { logger.info(xxx); })
//     //     .catch((error: any) => {
//     //         logger.info('XXXX');
//     //     });
// })();


// (async () => {
//     const guildId: string = String(random.int(5000, 1000));
//     const userId: string = String(random.int(1, 10000));
//     const dao: UserDao = new TableStorageUserDao(guildId);



//     const createdUser: DbUserEntry = await dao.add(new DbUserEntry(userId, 5));
//     let fetchedUser: DbUserEntry = await dao.getById(userId);
//     //logger.info(fetchedUser);

//     logger.info(`original userId='${userId}'`);
//     logger.info(`fetched userId='${fetchedUser.RowKey}'`);
//     await dao.deleteById(userId);
//     // await dao.getById(userId)
//     //     .then((xxx) => { logger.info(xxx); })
//     //     .catch((error: any) => {
//     //         logger.info('XXXX');
//     //     });
// })();



//const dbService: SertaDbService = new SertaDbService();

// let newDbEntry = new DbEntry(1, 0);
// newDbEntry.PartitionKey = '1234';
// newDbEntry.RowKey = '4';
// newDbEntry.levelId=7;


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





