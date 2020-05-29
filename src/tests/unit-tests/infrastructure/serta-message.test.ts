import {SertaMessage} from "../../../infrastructure/serta-message";
import {FakeMessage} from "../test-doubles/fake-message";
import {FakeDiscordUser} from "../test-doubles/fake-discord-users";
import {IMessage} from "../../../infrastructure/i-message";

describe("SertaMessage", () => {
    test("it should provide an Eris message", () => {
        const fakeErisMessage = new FakeMessage([]);
        const sut: SertaMessage = new SertaMessage(fakeErisMessage)
        expect(sut.erisMessage).toBe(fakeErisMessage)
    })

    test("it should return the mentions from message", () => {

        const fakeDiscordUser = new FakeDiscordUser("drecksid", "p.bauer");
        const sut: IMessage = new SertaMessage(new FakeMessage([fakeDiscordUser]))
        expect(sut.mentions.length).toBe(1)
        expect(sut.mentions[0]).toBe(fakeDiscordUser)
    })
})
