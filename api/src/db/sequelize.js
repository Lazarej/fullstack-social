import { DataTypes, Sequelize } from "sequelize";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import { PostModel } from "../models/post.js";

const sequelize = new Sequelize('social-media', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const User = UserModel(sequelize, DataTypes)
export const Post = PostModel(sequelize, DataTypes)
User.hasMany(Post)
User.belongsToMany(User, {
  through: 'FriendModel',
  as:'friends'
})
Post.belongsTo(User)



 export const initDb = async () => {
    try {
    await sequelize.sync({ force: true });
        console.log('Base de données "social-media" synchronisée');
        const hash = await bcrypt.hash("pikatchu", 10)
        const user = await User.create({
            email: 'attios@gmail.com',
            password: hash
        })
      const user2 = await User.create({
            email: 'leon@gmail.com',
            password: hash
      })
      const user3 = await User.create({
            email: 'jean@gmail.com',
            password: hash
        })
      const user4 = await User.create({
            email: 'caca@gmail.com',
            password: hash
      })
      user.addFriends(user2)
      user.addFriends(user3)
      console.log("Utilisateur créé", user.toJSON());
      const post = await Post.create({
        text: 'salut',
        UserId: 1        
      })
      const post1 = await Post.create({
        text: 'fez',
        UserId: 3        
      })
      const post2 = await Post.create({
        text: 'oui',
        UserId: 4       
      })
      const post3 = await Post.create({
        text: 'puo',
        UserId: 2       
      })
      const post4 = await Post.create({
        text: 'caca',
        UserId: 2       
      })
  
        console.log("Post créé", post.toJSON());
        const users = await User.findAll({ include: Post });
      console.log(JSON.stringify(users, null, 2));
       const posts = await Post.findAll({ include: User });
console.log(JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error(error)
         console.log('Base de données non synchronisée');
    }
}
    