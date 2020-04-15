import {LevelInformation} from "../../../../config/game-level-information";
import {UserLevelChanger} from "../../../../commands/serta-uplevel/user-level-changer";

describe("UserLevelChanger", () => {
    test("is constructed by passing level information", () => {
        // given
        const fakeLevelInformation: LevelInformation[] = [
            { id: 0, abbreviation: "S", name: "Loops", minimumImmuneLevel: 0, maximumImmuneLevel: 15, timeSpanForMedication: 10 }
        ]

        // when
        const sut = new UserLevelChanger(fakeLevelInformation)

        // then
        expect(sut).toBeTruthy()
    })
})