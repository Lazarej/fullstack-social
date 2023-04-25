import { Auth } from "../middleware/auth.js"
import { getUserById, putUser } from "../controllers/user.js"
import { upload } from "../middleware/multer.js"
 
export const GetUserById = (app) => { app.get('/api/user/:id', Auth, getUserById) } 
export const PutUser = (app) => {app.put('/api/user',Auth, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), putUser)}
