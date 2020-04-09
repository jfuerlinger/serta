import { SertaBot } from "./bot";

require('dotenv').config();

const createLogger = require('logging').default;
const logger = createLogger('driver');

const azureIdentity = require("@azure/identity");
const appConfig = require("@azure/app-configuration");
const { ClientSecretCredential } = require("@azure/identity");

//const credential = new azureIdentity.DefaultAzureCredential();
const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET);
const client = new appConfig.AppConfigurationClient(
    process.env.AZURE_CONFIGURATION_ENDPOINT,
    credential
);

(async () => {

    console.log("retrieving the key ...");
    try {

        let retrievedSetting = await client.getConfigurationSetting(
            {
                key: "bot-health-port",
                label: "Development"
            });
        console.log("Retrieved value:", retrievedSetting.value);

    } catch (error) {
        console.log(error);
    }


})();

// const bot = new SertaBot();
// bot.run();
