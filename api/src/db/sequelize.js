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
Post.belongsTo(User)
User.hasMany(Post)


 export const initDb = async () => {
    try {
    await sequelize.sync({ force: true });
        console.log('Base de données "social-media" synchronisée');
        const hash = await bcrypt.hash("pikatchu", 10)
        const user = await User.create({
            email: 'attios@gmail.com',
            password: hash
        })
      console.log("Utilisateur créé", user.toJSON());
      const post = await Post.create({
        text: 'salut',
        UserId: 1         
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
    