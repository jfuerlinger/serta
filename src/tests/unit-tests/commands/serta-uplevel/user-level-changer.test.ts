import {LevelInformation} from "../../../../config/game-level-information";
import {UserLevelChanger} from "../../../../commands/serta-uplevel/user-level-changer";
import {FakeSertaUser, fakeSertaUsers} from "../../test-doubles/fake-serta-user";
import {fakeGameLevels} from "../../test-doubles/fake-game-levels";

describe("UserLevelChanger", () => {
    let fakeLevelInformation: LevelInformation[]

    beforeEach(() => {
        fakeLevelInformation = fakeGameLevels
    })

    test("is constructed by passing level information", () => {
        // when
        const sut = new UserLevelChanger(fakeLevelInformation)

        // then
        expect(sut).toBeTruthy()
    })

    test("refuses uplevel if SertaUser immune level is insufficient", () => {
        // given
        const userWithTooLowImmuneSystem: FakeSertaUser = fakeSertaUsers[0]

        // when
        const sut = new UserLevelChanger(fakeLevelInformation)

        // then
        expect(sut.upLevelIsPossible(userWithTooLowImmuneSystem)).toBe(false)
    })

    test("accepts uplevel if SertaUser immune level is exactly sufficient", () => {
        // given
        const userWithExactlyFittingImmuneSystem: FakeSertaUser = fakeSertaUsers[1]

        // when
        const sut = new UserLevelChanger(fakeLevelInformation)

        // then
        expect(sut.upLevelIsPossible(userWithExactlyFittingImmuneSystem)).toBe(true)
    })

    test("accepts uplevel if SertaUser immune level is more than sufficient", () => {
        // given
        const userWithOverFittingImmuneSystem: FakeSertaUser = fakeSertaUsers[2]

        // when
        const sut = new UserLevelChanger(fakeLevelInformation)

        // then
        expect(sut.upLevelIsPossible(userWithOverFittingImmuneSystem)).toBe(true)
    })

    test("uplevels if SertaUser immune level is sufficient", () => {
        // given
        const userWithSufficientImmuneLevel = fakeSertaUsers[1]
        const sut = new UserLevelChanger(fakeLevelInformation)

        // when
        sut.upLevel(userWithSufficientImmuneLevel)

        // then
        expect(userWithSufficientImmuneLevel.levelId).toBe(1)
    })

    test("refuses uplevel if SertaUser immune level is insufficient", () => {
        // given
        const userWithInsufficientImmuneLevel = fakeSertaUsers[0]
        const sut = new UserLevelChanger(fakeLevelInformation)

        // when
        sut.upLevel(userWithInsufficientImmuneLevel)

        // then
        expect(userWithInsufficientImmuneLevel.levelId).toBe(0)
    })
})