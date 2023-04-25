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
    await sequelize.sync();
        console.log('Base de données "social-media" synchronisée');
   
    } catch (error) {
        console.error(error)
         console.log('Base de données non synchronisée');
    }
}
    