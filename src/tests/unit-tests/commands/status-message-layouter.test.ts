import * as FakeEnvironment from "../config/fake-environment"
import {StatusMessageLayouter} from "../../../commands/serta-status/status-message-layouter";
import {ConfigurationBuilder} from "../../../config/configuration-builder";

describe("SertaStatusLayouter getLayout returns embed", () => {
    const testStatusInformation = {
        name: "Peter",
        avatar_url: "some://url",
        levelName: "Methods",
        immunizationLevel: 52,
        readyToBePromoted: true,
        timeTillNextMedication: "3h 24m 17s",
        messageOfTheDay: "A message a day keeps the doctor away"
    }

    let layout: any
    beforeEach(() => {
        FakeEnvironment.setup()
        layout = StatusMessageLayouter.getLayout(testStatusInformation)
    })

    afterEach(() => FakeEnvironment.tearDown())

    test("is truthy", () => {
        expect(layout).toBeTruthy()
    })

    test("has title called 'Status'", () => {
        expect(layout.title).toBe("Status")
    })

    test("has an author.name called StatusInformation.name", () => {
        expect(layout.author.name).toBe(testStatusInformation.name)
    })

    test("author.name changes if StatusInformation changes", () => {
        expect(StatusMessageLayouter.getLayout({ name: "Joe" }).author.name).toBe("Joe")
    })

    test("has an author.url called StatusInformation.url", () => {
        expect(layout.author.icon_url).toBe(testStatusInformation.avatar_url)
    })

    test("has a field reflecting StatusInformation.levelName", () => {
        expect(layout.fields[0].name).toBe("Level")
        expect(layout.fields[0].value).toBe(testStatusInformation.levelName)
    })

    test("has a field reflecting StatusInformation.immuneLevel", () => {
        expect(layout.fields[1].name).toBe("Immunization Level")
        expect(layout.fields[1].value).toBe(testStatusInformation.immunizationLevel)
    })

    test("has a field reflecting StatusInformation.readyForPromotion", () => {
        expect(layout.fields[2].name).toBe("Ready to be\nPromoted")
        expect(layout.fields[2].value).toBe("yes")
    })

    test("misses the field for promotion if readyForPromotion == false", () => {
        const layout = StatusMessageLayouter.getLayout({})
        expect(layout.fields.length).toBe(2)
    })

    test("fields must be inline", () => {
        expect(layout.fields[1].inline).toBe(true)
    })

    test("indicates in footer how much time left to get rid of infection", () => {
        expect(layout.footer).toBe(`INFECTION ALERT!! You have ${testStatusInformation.timeTillNextMedication} left to get a medication`)
    })

    test("footer is empty if timeTillNextMedication is undefined", () => {
        const layout = StatusMessageLayouter.getLayout({})
        expect(layout.footer).toBe("")
    })

    test("color is red if player is on levelId 1", () => {
        const layout = StatusMessageLayouter.getLayout({levelId: 1})
        expect(layout.color).toBe(0xEB261F)
    })

    test("color is pink if player is on levelId 2", () => {
        const layout = StatusMessageLayouter.getLayout({levelId: 2})
        expect(layout.color).toBe(0xED62A7)
    })

    test("color is pink if player is on levelId 3", () => {
        const layout = StatusMessageLayouter.getLayout({levelId: 3})
        expect(layout.color).toBe(0xF7B92B)
    })

    test("color is pink if player is on levelId 4", () => {
        const layout = StatusMessageLayouter.getLayout({levelId: 4})
        expect(layout.color).toBe(0x000000)
    })

    test("color is pink if player is on levelId 5", () => {
        const layout = StatusMessageLayouter.getLayout({levelId: 5})
        expect(layout.color).toBe(0x1CA4FC)
    })

    test("color is pink if player is on levelId 6", () => {
        const layout = StatusMessageLayouter.getLayout({levelId: 6})
        expect(layout.color).toBe(0x65D643)
    })

    test("color is white if levelId is undefined", () => {
        expect(layout.color).toBe(0xFFFFFF)
    })

    test("description shows message of the day", () => {
        expect(layout.description).toBe(testStatusInformation.messageOfTheDay)
    })

    test("shows level pic for S in red if infected", () => {
        const statusInformation = { levelId: 1, timeTillNextMedication: "some time"}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        expect(thumbnail.url).toContain("s-red.png")
    })

    test("shows level pic for S in yellow if not infected and not promoted", () => {
        const statusInformation = { levelId: 1}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        expect(thumbnail.url).toContain("s-yellow.png")
    })

    test("shows level pic for S in green if not infected and promoted", () => {
        const statusInformation = { levelId: 1, readyToBePromoted: true}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        expect(thumbnail.url).toContain("s-green.png")
    })

    test("shows level pic for A in red if infected", () => {
        const statusInformation = { levelId: 2, timeTillNextMedication: "some time"}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        expect(thumbnail.url).toContain("a-red.png")
    })

    test("shows level pic for A in yellow if not infected and not promoted", () => {
        const statusInformation = { levelId: 2}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        expect(thumbnail.url).toContain("a-yellow.png")
    })

    test("shows level pic for A in green if not infected and promoted", () => {
        const statusInformation = { levelId: 2, readyToBePromoted: true}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        expect(thumbnail.url).toContain("a-green.png")
    })

    test("adds base url for images from config to level thumbnails", () => {
        const statusInformation = { levelId: 2, readyToBePromoted: true}
        const thumbnail = StatusMessageLayouter.getLayout(statusInformation).thumbnail
        const baseUrl = ConfigurationBuilder.getConfiguration().baseUrlForImages
        expect(thumbnail.url).toBe(baseUrl+"/a-green.png")
    })
})