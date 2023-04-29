import { getComments } from "../controllers/comment.js"
import { Auth } from "../middleware/auth.js"


export const GetComments = (app) => { app.get('/api/comments', Auth, getComments) } 