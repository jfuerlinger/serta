import { IAppConfigurationDao } from "./i-app-configuration-dao";

const createLogger = require('logging').default;
const logger = createLogger('app-configuration-dao');

export class AppConfigurationDao implements IAppConfigurationDao {

    constructor(
        private appConfigurationEnvironment: string,
        private appConfigurationClient: any,
        private keyVaultClient: any) {
    }

    async getEntry(key: string): Promise<string> {
        const value = await this.getEntryOrUndefined(key);
        if (value === undefined) {
            throw new Error(`The app setting '${key}' has not been set!`);
        }

        return <string>value;
    }

    async getEntryOrUndefined<T>(key: string): Promise<T> {

        try {
            const retrievedSetting = await this.appConfigurationClient.getConfigurationSetting(
                {
                    key: key,
                    label: this.appConfigurationEnvironment
                });

            if (retrievedSetting.contentType.indexOf('application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8') != -1) {
                return (await this.keyVaultClient.getSecret(retrievedSetting.key)).value;
            } else {
                return retrievedSetting.value;
            }

        } catch (error) {
            logger.error(error);
            throw new Error(`Unable to retrieve setting '${key}'`);
        }
    }
}