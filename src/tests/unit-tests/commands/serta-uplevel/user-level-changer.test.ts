import {LevelInformation} from "../../../../config/game-level-information";
import {UserLevelChanger} from "../../../../commands/serta-uplevel/user-level-changer";
import {FakeSertaUser, fakeSertaUsers} from "../../test-doubles/fake-serta-user";
import {fakeGameLevels} from "../../test-doubles/fake-game-levels";

describe("UserLevelChanger", () => {
    let fakeLevelInformation: LevelInformation[]
    let sut: UserLevelChanger

    beforeEach(() => {
        fakeLevelInformation = fakeGameLevels
        sut = new UserLevelChanger(fakeLevelInformation)
    })

    describe("upLevelIsPossible", () => {
        test("it return false if SertaUser immune level is insufficient", () => {
            // arrange
            const userWithTooLowImmuneSystem: FakeSertaUser = fakeSertaUsers[0]

            // assert
            expect(sut.upLevelIsPossible(userWithTooLowImmuneSystem)).toBe(false)
        })

        test("it returns true if SertaUser immune level is exactly sufficient", () => {
            // arrange
            const userWithExactlyFittingImmuneSystem: FakeSertaUser = fakeSertaUsers[1]

            // assert
            expect(sut.upLevelIsPossible(userWithExactlyFittingImmuneSystem)).toBe(true)
        })

        test("it returns true if SertaUser immune level is more than sufficient", () => {
            // arrange
            const userWithOverFittingImmuneSystem: FakeSertaUser = fakeSertaUsers[2]

            // assert
            expect(sut.upLevelIsPossible(userWithOverFittingImmuneSystem)).toBe(true)
        })
    })

    describe("upLevel", () => {
        test("it uplevels if SertaUser immune level is sufficient", () => {
            // arrange
            const userWithSufficientImmuneLevel = fakeSertaUsers[1]
            const levelBeforeUplevel = userWithSufficientImmuneLevel.levelId

            // act
            sut.upLevel(userWithSufficientImmuneLevel)

            // assert
            expect(userWithSufficientImmuneLevel.levelId).toBe(levelBeforeUplevel + 1)
        })

        test("it refuses uplevel if SertaUser immune level is insufficient", () => {
            // arrange
            const userWithInsufficientImmuneLevel = fakeSertaUsers[0]
            const levelBeforeUpLevel = userWithInsufficientImmuneLevel.levelId

            // act
            sut.upLevel(userWithInsufficientImmuneLevel)

            // assert
            expect(userWithInsufficientImmuneLevel.levelId).toBe(levelBeforeUpLevel)
        })
    })

    describe("downLevelIsPossible", () => {
        test("it returns false if immune level is too high", () => {
            // arrange
            const userWithTooHighImmuneLevelToBeDownLeveled = fakeSertaUsers[3]

            // assert
            expect(sut.downLevelIsPossible(userWithTooHighImmuneLevelToBeDownLeveled)).toBe(false)
        })

        test("it returns true if immune level is one too low for the current level", () => {
            // arrange
            const userWithTooLowImmuneLevel = fakeSertaUsers[4]

            // assert
            expect(sut.downLevelIsPossible(userWithTooLowImmuneLevel)).toBe(true)
        })

        describe("downLevel", () => {
            test("it down levels if immune level is one too low for the current level", () => {
                // arrange
                const userWithTooLowImmuneLevel = fakeSertaUsers[4]
                const levelBeforeDownLevel = userWithTooLowImmuneLevel.levelId

                // act
                sut.downLevel(userWithTooLowImmuneLevel)

                // assert
                expect(userWithTooLowImmuneLevel.levelId).toBe(levelBeforeDownLevel - 1)
            })
        })
    })
})