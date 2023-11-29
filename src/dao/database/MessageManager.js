import messageModel from '../models/message.model.js'

class MessageManager {
    constructor() {
    }

    getMessages = async () => {
        try {
            const lookMessage = await messageModel.find().lean()

            return lookMessage
        } catch (err) {
            return console.error(err)
        }
    }

    createMessage = async (message) => {
        try {
            const newMessage = await messageModel.create(message)

            return newMessage
        } catch (err) {
            return console.error(err)
        }
    }
}

export default MessageManager