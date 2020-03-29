import { SertaBot } from "./bot";

const createLogger = require('logging').default;
const logger = createLogger('driver');

logger.info('test');

const bot = new SertaBot();
bot.run();
