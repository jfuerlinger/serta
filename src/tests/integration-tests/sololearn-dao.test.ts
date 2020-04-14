import { SololearnDao } from "../../dao/sololearn/sololearn-dao";

describe("SololearnDao", () => {

    test("getXPForUser() with id for j.fuerlinger should return XP >= 40 ", async () => {

        const userId = '6599010';
        const sololearnDao = new SololearnDao();

        let xp = await sololearnDao.getXPForUser(userId);

        expect(xp).toBeGreaterThanOrEqual(40);
    });
});
