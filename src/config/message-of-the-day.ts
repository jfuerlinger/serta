export class MessageOfTheDay {

    private messages: Message[][]

    constructor(messages: Message[][]) {
        this.messages = messages
    }

    getMessage(level: number): Message {
        const index = Math.max(0, (level - 1))
        return this.messages[index][0]
    }
}

interface Message {
    level: number
    text: string
}