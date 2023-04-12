import { Auth } from "../auth/auth.js"
import { getFriendsPosts, getPosts } from "../controllers/post.js"

export const GetPosts = (app) => { app.get('/api/posts/user', Auth, getPosts) } 
export const GetFriendsPosts = (app) =>  {app.get('/api/posts/friends',Auth, getFriendsPosts)} 