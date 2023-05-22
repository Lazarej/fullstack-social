import { createFriendsNotification } from "../controllers/notification.js"
import { Auth } from "../middleware/auth.js"


export const CreateFriendsNotification = (app) => { app.post('/api/notification', Auth, createFriendsNotification) } 