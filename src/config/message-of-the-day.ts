const random = require('random');

export class MessageOfTheDay {

    private readonly messages: Message[][]

    constructor(messages: Message[][]) {
        this.messages = messages
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