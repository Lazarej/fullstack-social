import { Auth } from "../auth/auth.js"
import { getUserById, putUser } from "../controllers/user.js"
 
export const GetUserById = (app) => { app.get('/api/user/:id', Auth, getUserById) } 
export const PutUser = (app) => {app.put('/api/user',Auth, putUser)}
