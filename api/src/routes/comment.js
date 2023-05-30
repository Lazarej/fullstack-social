import { getComments, postComment } from "../controllers/comment.js"
import { Auth } from "../middleware/auth.js"
import { sendNotification } from "../middleware/notification.js"


export const GetComments = (app) => { app.get('/api/comments/:id', Auth, getComments) } 
export const PostComment = (app) => { app.post('/api/comments', Auth, sendNotification,postComment) } 