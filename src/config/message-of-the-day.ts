export class MessageOfTheDay {

    private messages: Message[]

    constructor(messages: Message[]) {
        this.messages = messages
    }

    getMessage(level: number): Message | undefined {
        let selectedMessage: Message | undefined = undefined

        this.messages.forEach(message => {
            if (message.level == level)
                selectedMessage = message
        })
        return selectedMessage
    }
}

interface Message {
    level: number
    text: string
}