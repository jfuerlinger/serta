import { SertaBot } from "./bot";
import { ConfigurationBuilder } from "./config/configuration-builder";
import { AzureUtils } from "./utils/azure-utils";
import { ISettingResolver } from "./config/i-setting-resolver";


// initialization of the dependencies

const settingResolver: ISettingResolver = AzureUtils.getSettingResolver();
ConfigurationBuilder.SettingResolver = settingResolver;

(async () => {
    const bot = new SertaBot(settingResolver);
    await bot.initBot();
    bot.run();
})();
