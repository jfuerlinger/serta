import {MessageOfTheDay} from "../../../src/config/message-of-the-day";
import {Message} from "eris";

describe("MessageOfTheDay", () => {
    const fakeMessages = [
        {level: 1, text: "Hopauf1"}, {level: 2, text: "Hopauf2"}, {level: 3, text: "Hopauf3"}, {level: 4, text: "Hopauf4"}, {level: 5, text: "Hopauf5"}, {level: 6, text: "Hopauf6"},
        {level: 1, text: "Hopauf1"}, {level: 2, text: "Hopauf2"}, {level: 3, text: "Hopauf3"}, {level: 4, text: "Hopauf4"}, {level: 5, text: "Hopauf5"}, {level: 6, text: "Hopauf6"},
        {level: 1, text: "Hopauf1"}, {level: 2, text: "Hopauf2"}, {level: 3, text: "Hopauf3"}, {level: 4, text: "Hopauf4"}, {level: 5, text: "Hopauf5"}, {level: 6, text: "Hopauf6"},
        {level: 1, text: "Hopauf1"}, {level: 2, text: "Hopauf2"},                              {level: 4, text: "Hopauf4"}, {level: 5, text: "Hopauf5"}, {level: 6, text: "Hopauf6"},
        {level: 1, text: "Hopauf1"}, {level: 2, text: "Hopauf2"},                              {level: 4, text: "Hopauf4"}, {level: 5, text: "Hopauf5"}, {level: 6, text: "Hopauf6"},
        {level: 2, text: "Hopauf2"},                                                           {level: 4, text: "Hopauf4"}, {level: 5, text: "Hopauf5"}, {level: 6, text: "Hopauf6"},
    ]
    test("when constructed an array of messages must be feeded", () =>{
        new MessageOfTheDay(fakeMessages);
    })

    test("when asked for a message it must contain 'Hopauf'", (done) => {
        const motd = new MessageOfTheDay(fakeMessages)
        const anyLevel = 3;
        let selectedMessage = motd.getMessage(anyLevel)
        if (selectedMessage) {
            expect(selectedMessage.text).toContain("Hopauf")
            done()
        }
        else
            done.fail("No message for requested level found")
    })

    test("returns a message for each level", (done) => {
        const motd: MessageOfTheDay = new MessageOfTheDay(fakeMessages)
        for(let i = 1; i <= 6; i++) {
            let selectedMessage = motd.getMessage(i)
            if (selectedMessage) {
                expect(selectedMessage.level).toBe(i)
                done()
            }
            else
                done.fail("No message for requested level found")
        }
    })

    test("returns a message for level 2", (done) => {
        const motd = new MessageOfTheDay(fakeMessages)

        let selectedMessage = motd.getMessage(2)
        if (selectedMessage) {
            expect(selectedMessage.level).toBe(2)
            done()
        }
        else
            done.fail("No message for requested level found")
    })
})