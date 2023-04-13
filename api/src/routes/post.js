import { Auth } from "../auth/auth.js"
import { getPosts, getFeedPosts } from "../controllers/post.js"

export const GetPosts = (app) => { app.get('/api/posts/user', Auth, getPosts) } 
export const GetFeedPosts = (app) =>  {app.get('/api/posts/feed',Auth, getFeedPosts)} 