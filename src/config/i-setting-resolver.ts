export interface ISettingResolver {
    getSetting(name: string): Promise<string>;
}