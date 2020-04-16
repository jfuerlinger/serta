import { IAppConfigurationDao } from "../../../../dao/app-configuration/i-app-configuration-dao";

export class FakeAppConfigurationDao implements IAppConfigurationDao {
    
    getEntryOrUndefined(key: string): Promise<string | undefined> {
        return this.getEntry(key);
    }
    
    getEntry(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            
            switch(key) {
                case 'as-account': resolve('p.bauer');
                break;
                case 'as-access-key': resolve('sdfkjlsdfkjlsdf');
                break;
                default:
                    resolve(`value for '${key}'`);            
            }
        });
    }
}