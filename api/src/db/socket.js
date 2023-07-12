import { Server } from 'socket.io'
import { server } from '../../app.js'

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods:['GET','POST'],
    }
})

export const initSocket = () => {
    io.on('connection', (socket) => {
        console.log('connetion', socket.id)

        socket.on('send_message', (data) => {
            console.log(data)
        })
    })
}