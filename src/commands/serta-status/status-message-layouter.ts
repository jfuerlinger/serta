export interface StatusInformation {
    name?: string
    avatar_url?: string
    levelName?: string
    immunizationLevel?: number
    readyToBePromoted?: boolean
    timeTillNextMedication?: string
    levelId?: number
    messageOfTheDay?: string
}

export class StatusMessageLayouter {
    static getLayout(statusInformation: StatusInformation): any {
        return {
            color: this.getColor(statusInformation.levelId),
            title: "Status",
            author: {
                name: statusInformation.name,
                icon_url: statusInformation.avatar_url
            },
            description: statusInformation.messageOfTheDay,
            fields: [
                this.createField("Level", statusInformation.levelName),
                this.createField("Immunization Level", statusInformation.immunizationLevel),
                statusInformation.readyToBePromoted ? this.createField("Ready to be\nPromoted", "yes") : undefined
            ],
            thumbnail: {
                url: this.getThumbnailUrl(statusInformation.levelId, statusInformation.timeTillNextMedication, statusInformation.readyToBePromoted)
            },
            footer: this.getFooter(statusInformation)
        }
    }

    private static createField(name: string, value?: string | number) {
        return {
            name: name,
            value: value,
            inline: true
        };
    }

    private static colorLevels = [0xEB261F, 0xED62A7, 0xF7B92B, 0x000000, 0x1CA4FC, 0x65D643]

    private static getColor(levelId?: number): number {
        return levelId ? StatusMessageLayouter.colorLevels[levelId - 1] : 0xFFFFFF;
    }

    private static getFooter(statusInformation: StatusInformation): string {
        return statusInformation.timeTillNextMedication ?
            `INFECTION ALERT!! You have ${statusInformation.timeTillNextMedication} left to get a medication` :
            ""
    }

    static levelPrefixes = ["s", "a", "m", "c", "f", "p"]
    private static getThumbnailUrl(levelId?: number, timeTillNextMedication?: string, readyToBePromoted?: boolean): string | undefined {
        if (levelId) {
            const levelPrefix = this.levelPrefixes[levelId - 1]
            if (timeTillNextMedication) {
                return levelPrefix + "-red.png"
            } else if (readyToBePromoted) {
                return levelPrefix + "-green.png"
            } else {
                return levelPrefix + "-yellow.png"
            }
        }
    }
}