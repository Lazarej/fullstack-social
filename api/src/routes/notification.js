import { createFriendsNotification, getFriendsNotification } from "../controllers/notification.js"
import { Auth } from "../middleware/auth.js"


export const CreateFriendsNotification = (app) => { app.post('/api/notification/friend', Auth, createFriendsNotification) } 
export const GetFriendsNotification = (app) => { app.get('/api/notification/friend', Auth, getFriendsNotification) } 
export const CreateFriendRelation = (app) => { app.post('/api/notification/addFriend', Auth, createFriendRelation) } 