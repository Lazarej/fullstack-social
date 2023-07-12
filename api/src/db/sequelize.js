import { DataTypes, Sequelize } from "sequelize";
import { UserModel } from "../models/user.js";
import { PostModel } from "../models/post.js";
import { CommentModel } from "../models/comment.js";
import { NotificationModel } from "../models/notification.js";
import { ChatModel } from "../models/chat.js";
import { MessageModel } from "../models/message.js";

export const sequelize = new Sequelize('social-media', 'root', '', {
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
export const Comment = CommentModel(sequelize, DataTypes)
export const Notification = NotificationModel(sequelize, DataTypes)
export const Chat = ChatModel(sequelize, DataTypes)
export const Message = MessageModel(sequelize, DataTypes)
User.hasMany(Post)
User.hasMany(Comment)
User.belongsToMany(User, {
  through: 'FriendModel',
  as: 'friends',
})
User.hasMany(Chat)
User.hasMany(Message)
User.hasMany(Notification, { as: 'receivedNotifications', foreignKey: 'recipientId' })
User.hasMany(Notification, { as: 'sentNotifications', foreignKey: 'senderId' });
Post.belongsTo(User)
Post.hasMany(Comment, {as: 'comments'})
Comment.belongsTo(Post)
Comment.belongsTo(User)
Notification.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Notification.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });
Chat.hasMany(Message)
Message.hasOne(User)
Message.hasOne(Chat)




 export const initDb = async () => {
    try {
    await sequelize.sync();
      console.log('Base de données "social-media" synchronisée');
    } catch (error) {
        console.error(error)
         console.log('Base de données non synchronisée');
    }
}
    