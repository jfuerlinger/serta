export interface IAppConfigurationDao {
    getEntryOrUndefined(key: string): Promise<string | undefined>;
    getEntry(key: string): Promise<string>;
}