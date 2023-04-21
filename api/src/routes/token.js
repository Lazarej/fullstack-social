import { getNewToken,getRefreshToken } from "../controllers/token.js"


export const GetRefreshToken = (app) => { app.get('/api/refreshToken',  getRefreshToken) } 
export const GetNewToken = (app) => { app.get('/api/newToken',  getNewToken) } 