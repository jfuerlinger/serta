const random = require('random');
import * as MessagesOfTheDay from "./messages-of-the-day"

export class MessageOfTheDay {

    private readonly messages: Message[][]

    constructor(importer: MessageOfTheDayImporter) {
        this.messages = importer.import()
    }

    getMessage(level: number): Message {
        const maxIndex = this.messages.length - 1;
        const levelIndex = Math.min(maxIndex, Math.max(0, (level - 1)))
        const messagesOfLevel = this.messages[levelIndex]

        const messageIndex = random.int(0, messagesOfLevel.length - 1)
        return messagesOfLevel[messageIndex]
    }
}

export interface Message {
    level: number
    text: string
}

export interface MessageOfTheDayImporter {
    import(): Message[][]
}

export class InMemoryMessageOfTheDayImporter implements MessageOfTheDayImporter {
    private readonly messages: Message[][]

    constructor(initialMessages?: Message[][]) {
        if (initialMessages == undefined) {
            this.messages = MessagesOfTheDay.messages
        } else {
            this.messages = initialMessages
        }
    }
    import(): Message[][] {
        return this.messages;
    }

}