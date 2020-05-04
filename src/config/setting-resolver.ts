import { ISettingResolver } from "./i-setting-resolver";
import { IEnvironmentDao } from "../dao/environment/i-environment-dao";
import { IAppConfigurationDao } from "../dao/app-configuration/i-app-configuration-dao";

export class SettingResolver implements ISettingResolver {

    constructor(
        private _environmentDao: IEnvironmentDao,
        private _appConfigurationDao: IAppConfigurationDao) {

    }

    getSetting(name: string): Promise<string> {

        return new Promise(async (resolve, reject) => {
            let settingValue = undefined || this._environmentDao.getEnvironmentVariableOrUndefined(name) || await this._appConfigurationDao.getEntryOrUndefined(name);
            if (settingValue) {
                resolve(settingValue);
            } else {
                reject(`Unable to resolve setting with the name '${name}'`);
            }
        });
    }

}