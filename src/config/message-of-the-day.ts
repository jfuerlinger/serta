export class MessageOfTheDay {

    private messages: Message[][]

    constructor(messages: Message[][]) {
        this.messages = messages
    }

    getMessage(level: number): Message | undefined {
        return this.messages[level - 1][0]
    }
}

interface Message {
    level: number
    text: string
}