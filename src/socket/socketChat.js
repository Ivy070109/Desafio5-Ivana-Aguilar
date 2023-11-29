import MessageManager from "../dao/database/MessageManager.js"

const messages = new MessageManager()

//establecer el ámbito de conección
const socketChat = (socketServer) => {
    //conectamos
    socketServer.on('connection', (socket) => {
        console.log('Se conectó', socket.id)
        socket.on('mensaje', async (data) => {
            await messages.createMessage(data);
            const mensajes = await messages.getMessages()
            console.log(mensajes)
            socketServer.emit('new_message', mensajes)
        })
    })
}

export default socketChat