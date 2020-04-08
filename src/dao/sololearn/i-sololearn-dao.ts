export interface ISololearnDao {
    getXPForUser(userId: string) : Promise<number>;
}