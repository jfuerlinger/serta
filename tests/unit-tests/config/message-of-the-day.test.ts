import {MessageOfTheDay} from "../../../src/config/message-of-the-day";

describe("MessageOfTheDay", () => {
    const fakeMessages = [
        [
            {level: 1, text: "Hopauf1"},
            {level: 1, text: "Hopauf1"},
            {level: 1, text: "Hopauf1"},
            {level: 1, text: "Hopauf1"},
            {level: 1, text: "Hopauf1"}
        ],
        [
            {level: 2, text: "Hopauf2"},
            {level: 2, text: "Hopauf2"},
            {level: 2, text: "Hopauf2"},
            {level: 2, text: "Hopauf2"},
            {level: 2, text: "Hopauf2"},
            {level: 2, text: "Hopauf2"},
        ],
        [
            {level: 3, text: "Hopauf3"},
            {level: 3, text: "Hopauf3"},
            {level: 3, text: "Hopauf3"},
        ],
        [
            {level: 4, text: "Hopauf4"},
            {level: 4, text: "Hopauf4"},
            {level: 4, text: "Hopauf4"},
            {level: 4, text: "Hopauf4"},
            {level: 4, text: "Hopauf4"},
            {level: 4, text: "Hopauf4"},
        ],
        [
            {level: 5, text: "Hopauf5"},
            {level: 5, text: "Hopauf5"},
            {level: 5, text: "Hopauf5"},
            {level: 5, text: "Hopauf5"},
            {level: 5, text: "Hopauf5"},
            {level: 5, text: "Hopauf5"},
        ],
        [
            {level: 6, text: "Hopauf6"},
            {level: 6, text: "Hopauf6"},
            {level: 6, text: "Hopauf6"},
            {level: 6, text: "Hopauf6"},
            {level: 6, text: "Hopauf6"},
            {level: 6, text: "Hopauf6"},
        ]
    ]
    test("when constructed an array of messages must be feeded", () => {
        new MessageOfTheDay(fakeMessages);
    })

    test("when asked for a message it must contain 'Hopauf'", () => {
        const motd = new MessageOfTheDay(fakeMessages)
        const anyLevel = 3;
        expect(motd.getMessage(anyLevel).text).toContain("Hopauf")
    })

    test("returns a message for each level", () => {
        const motd: MessageOfTheDay = new MessageOfTheDay(fakeMessages)
        for (let i = 1; i <= 6; i++) {
            expect(motd.getMessage(i).level).toBe(i)
        }
    })

    test("returns a message for level 2", () => {
        const motd = new MessageOfTheDay(fakeMessages)

        expect(motd.getMessage(2).level).toBe(2)
    })

    test("when asked for a too small level returns the smallest", () => {
        const motd = new MessageOfTheDay(fakeMessages)
        expect(motd.getMessage(0).level).toBe(1)
    })
})