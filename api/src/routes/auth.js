import { Auth } from "../auth/auth.js"
import { create, login, logout } from "../controllers/auth.js"

export const Login = (app) =>  {app.post('/api/auth/login', login)} 
export const Create = (app) =>  {app.post('/api/auth/register',create)} 
export const Logout = (app) =>  {app.post('/api/auth/logout',logout)} 
