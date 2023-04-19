import { Auth } from "../auth/auth.js"
import { getUserById } from "../controllers/user.js"
 
export const GetUserById = (app) => { app.get('/api/user/:id', Auth, getUserById) } 
