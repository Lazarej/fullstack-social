import { getChats } from "../controllers/chat.js"
import { Auth } from "../middleware/auth.js"


export const GetChats = (app) => { app.get('/api/chats', Auth, getChats) } 