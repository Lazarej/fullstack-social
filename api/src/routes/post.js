import { Auth } from "../auth/auth.js"
import { getPosts, getFeedPosts, createPost } from "../controllers/post.js"

export const GetPosts = (app) => { app.get('/api/posts/user', Auth, getPosts) } 
export const GetFeedPosts = (app) => { app.get('/api/posts/feed', Auth, getFeedPosts) } 
export const CreatPosts = (app) => { app.post('/api/post', Auth, createPost) }