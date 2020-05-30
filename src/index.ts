import { SertaBot } from "./bot";
import { ConfigurationBuilder } from "./config/configuration-builder";
import { AzureUtils } from "./utils/azure-utils";
import { ISettingResolver } from "./config/i-setting-resolver";

// initialization of the dependencies

const settingResolver: ISettingResolver = AzureUtils.getSettingResolver();
ConfigurationBuilder.SettingResolver = settingResolver;

const appInsights = require("applicationinsights");

(async () => {

    const aiInstrumentationKey = await settingResolver.getSetting('ai-instrumentation-key');
    console.log(aiInstrumentationKey);
    appInsights.setup(aiInstrumentationKey)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .start();

    const bot = new SertaBot(settingResolver);
    await bot.initBot();
    bot.run();
})();

var express = require('express');
var app = express();
app.get('/', function (req: any, res:any) {
  res.send('!! Hello world - serta is commin !!');
});
app.listen(8000, function () {
  console.log('Health check is listening on port 8000!');
});
