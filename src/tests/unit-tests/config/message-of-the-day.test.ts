import {
    MessageOfTheDayProvider,
    Message,
    InMemoryMessageOfTheDayImporter,
    MessageOfTheDayImporter
} from "../../../config/message-of-the-day-provider";
import * as MessagesOfTheDay from "../../../config/messages-of-the-day"

const fakeMessages = [
    [
        {level: 1, text: "Hopauf1"},
        {level: 1, text: "Hopauf2"},
        {level: 1, text: "Hopauf3"},
        {level: 1, text: "Hopauf4"},
        {level: 1, text: "Hopauf5"}
    ],
    [
        {level: 2, text: "Hopauf1"},
        {level: 2, text: "Hopauf2"},
        {level: 2, text: "Hopauf3"},
        {level: 2, text: "Hopauf4"},
        {level: 2, text: "Hopauf5"},
        {level: 2, text: "Hopauf6"},
    ],
    [
        {level: 3, text: "Hopauf1"},
        {level: 3, text: "Hopauf2"},
        {level: 3, text: "Hopauf3"},
    ],
    [
        {level: 4, text: "Hopauf1"},
        {level: 4, text: "Hopauf2"},
        {level: 4, text: "Hopauf3"},
        {level: 4, text: "Hopauf4"},
        {level: 4, text: "Hopauf5"},
        {level: 4, text: "Hopauf6"},
    ],
    [
        {level: 5, text: "Hopauf1"},
        {level: 5, text: "Hopauf2"},
        {level: 5, text: "Hopauf3"},
        {level: 5, text: "Hopauf4"},
        {level: 5, text: "Hopauf5"},
        {level: 5, text: "Hopauf6"},
    ],
    [
        {level: 6, text: "Hopauf1"},
        {level: 6, text: "Hopauf2"},
        {level: 6, text: "Hopauf3"},
        {level: 6, text: "Hopauf4"},
        {level: 6, text: "Hopauf5"},
        {level: 6, text: "Hopauf6"},
    ]
]

describe("InMemoryMessageOfTheDayImporter", () => {
    test("when instantiated without parameters the default file is loaded", () => {
        const importer = new InMemoryMessageOfTheDayImporter()

        const expectedFirstMessage = MessagesOfTheDay.messages[0][0]
        const firstMessage = importer.import()[0][0]

        expect(firstMessage).toBe(expectedFirstMessage)
    })

    test("when instantiated with a parameter the messages passed are loaded", () =>{
        const importer = new InMemoryMessageOfTheDayImporter(fakeMessages)

        const expectedFirstMessage = fakeMessages[3][2]
        const firstMessage = importer.import()[3][2]

        expect(firstMessage).toBe(expectedFirstMessage)
    })
})

describe("MessageOfTheDay", () => {
    let importer: MessageOfTheDayImporter
    let motd: MessageOfTheDayProvider

    beforeEach(() => {
        importer = new InMemoryMessageOfTheDayImporter(fakeMessages)
        motd = new MessageOfTheDayProvider(importer)
    })

    test("when asked for a message it must contain 'Hopauf'", () => {
        const anyLevel = 3;
        expect(motd.getMessage(anyLevel).text).toContain("Hopauf")
    })

    test("returns a message for each level", () => {
        for (let i = 1; i <= 6; i++) {
            expect(motd.getMessage(i).level).toBe(i)
        }
    })

    test("returns a message for level 2", () => {

        expect(motd.getMessage(2).level).toBe(2)
    })

    test("when asked for a too small level returns the smallest", () => {
        expect(motd.getMessage(0).level).toBe(1)
    })

    test("when asked for a too high level returns the highest", () => {
        expect(motd.getMessage(fakeMessages.length + 1).level).toBe(6)
    })

    test("when asked for a level often the available messages shall be chosen randomly", () =>{
        const messageSequence = new Array<Message>()
        const anyLevel = 3
        const closeToVeryOften = 10000;
        for (let i = 0; i < closeToVeryOften; i++) {
            messageSequence.push(motd.getMessage(anyLevel))
        }
        const zeros = messageSequence.filter(msg => msg.text.endsWith("1"))
        expect(zeros.length / closeToVeryOften).toBeCloseTo(1/fakeMessages[anyLevel - 1].length, 1.5)
    })
})