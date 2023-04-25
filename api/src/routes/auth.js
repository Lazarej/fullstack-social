import { Auth } from "../middleware/auth.js"
import { create, login, logout } from "../controllers/auth.js"

export const Login = (app) =>  {app.post('/api/auth/login', login)} 
export const Create = (app) =>  {app.post('/api/auth/register',create)} 
export const Logout = (app) =>  {app.get('/api/auth/logout',Auth ,logout)} 
