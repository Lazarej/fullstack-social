
import { createMessage, getMessagesByChat } from "../controllers/message.js"
import { Auth } from "../middleware/auth.js"


export const GetMessagesByChat = (app) => { app.get('/api/messages/:id', Auth, getMessagesByChat) } 
export const CreateMessage = (app) => { app.post('/api/message', Auth, createMessage) } 