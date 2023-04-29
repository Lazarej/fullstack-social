import express from 'express'
import cors from 'cors'
import { initDb } from './src/db/sequelize.js';
import { Login, Create, Logout } from './src/routes/auth.js';
import cookieParser from 'cookie-parser';
import { CreatPosts, GetFeedPosts, GetPosts,  } from './src/routes/post.js';
import * as dotenv from 'dotenv'
import path from 'path'
import { GetUserById, PutUser } from './src/routes/user.js';
import { GetRefreshToken } from './src/routes/token.js';
import { GetComments } from './src/routes/comment.js';


dotenv.config()
const __dirname = path.resolve();
const app = express()
const port = 8800

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'uploads')))

Login(app)
Create(app)
Logout(app)
GetPosts(app)
GetFeedPosts(app)
CreatPosts(app)
GetUserById(app)
GetRefreshToken(app)
PutUser(app)
GetComments(app)


app.listen(port, () => console.log(`http://localhost:${port}`));

initDb()

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource  demandée! Vous pouvez  essayer une autre URL'
    res.status(404).json({message})
})
