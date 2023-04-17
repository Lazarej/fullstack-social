import { Auth } from "../auth/auth.js"
import multer from 'multer';
import path from 'path'
import { getPosts, getFeedPosts, createPost } from "../controllers/post.js"
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

export const GetPosts = (app) => { app.get('/api/posts/user', Auth, getPosts) } 
export const GetFeedPosts = (app) => { app.get('/api/posts/feed', Auth, getFeedPosts) } 
export const CreatPosts = (app) => { app.post('/api/post', Auth, upload.single('image'), createPost) }