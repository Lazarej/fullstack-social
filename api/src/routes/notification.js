import { createFriendRelation, createFriendsNotification, getNotification, updateNotification } from "../controllers/notification.js"
import { Auth } from "../middleware/auth.js"


export const CreateFriendsNotification = (app) => { app.post('/api/notification/friend', Auth, createFriendsNotification) } 
export const GetNotification = (app) => { app.get('/api/notification', Auth, getNotification) } 
export const CreateFriendRelation = (app) => { app.post('/api/notification/addFriend', Auth, createFriendRelation) } 
export const UpdateNotification = (app) => { app.put('/api/notification/:id', Auth, updateNotification) } 