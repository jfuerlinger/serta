import { ISettingResolver } from "../config/i-setting-resolver";
import { IEnvironmentDao } from "../dao/environment/i-environment-dao";
import { EnvironmentDao } from "../dao/environment/environment-dao";
import { AppConfigurationDao } from "../dao/app-configuration/app-configuration-dao";
import { SettingResolver } from "../config/setting-resolver";
import { IAppConfigurationDao } from "../dao/app-configuration/i-app-configuration-dao";
import { IUserDao } from "../dao/i-user-dao";
import { TableStorageUserDao } from "../dao/table-storage/table-storage-user-dao";

const azureIdentity = require("@azure/identity");
const appConfig = require("@azure/app-configuration");
const { SecretClient } = require("@azure/keyvault-secrets");

const createLogger = require('logging').default;
const logger = createLogger('azure-utils');

export class AzureUtils {

    private static settingResolverInstance: ISettingResolver;
    private static appConfigurationDaoInstance: IAppConfigurationDao;

    public static getAppConfigurationDao(): IAppConfigurationDao {

        if (!this.appConfigurationDaoInstance) {

            const environmentDao = new EnvironmentDao();

            const credentials = new azureIdentity.ChainedTokenCredential(
                new azureIdentity.DefaultAzureCredential(),
                new azureIdentity.ManagedIdentityCredential(environmentDao.getEnvironmentVariable('AZURE_CLIENT_ID')));

            const appConfigurationClient = new appConfig.AppConfigurationClient(environmentDao.getEnvironmentVariable('APP_CONFIGURATION_URL'), credentials);
            const keyVaultClient = new SecretClient(environmentDao.getEnvironmentVariable('KEY_VAULT_URL'), credentials);

            this.appConfigurationDaoInstance = new AppConfigurationDao(
                environmentDao.getEnvironmentVariable('APP_CONFIG_ENVIRONMENT'),
                appConfigurationClient,
                keyVaultClient
            );
        }

        return this.appConfigurationDaoInstance
    }

    public static getSettingResolver(): ISettingResolver {

        if (!this.settingResolverInstance) {

            logger.info('building SettingResolver instance ...');

            const environmentDao: IEnvironmentDao = new EnvironmentDao();
            const credentials = new azureIdentity.ChainedTokenCredential(
                new azureIdentity.DefaultAzureCredential(),
                new azureIdentity.ManagedIdentityCredential(environmentDao.getEnvironmentVariable('AZURE_CLIENT_ID')));

            const appConfigurationClient = new appConfig.AppConfigurationClient(environmentDao.getEnvironmentVariable('APP_CONFIGURATION_URL'), credentials);
            const keyVaultClient = new SecretClient(environmentDao.getEnvironmentVariable('KEY_VAULT_URL'), credentials);

            this.settingResolverInstance = new SettingResolver(
                environmentDao,
                new AppConfigurationDao(
                    environmentDao.getEnvironmentVariable('APP_CONFIG_ENVIRONMENT'),
                    appConfigurationClient,
                    keyVaultClient
                ));

            logger.info('[DONE]: SettingResolver built.');

        }
        return this.settingResolverInstance;
    }

    public static getUserDao(guildId: string) : IUserDao {
        return new TableStorageUserDao(AzureUtils.getAppConfigurationDao(), guildId);
    }
}
