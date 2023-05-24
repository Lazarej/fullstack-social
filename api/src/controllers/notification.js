import { Notification, User } from "../db/sequelize.js";
import jwt from "jsonwebtoken";


export const createFriendsNotification = async (req, res) => {
    const token = req.cookies.accessToken;
    const senderId = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
    const recipientId = req.body.id
  try {
    const friendNotification = await Notification.create(
        {
            senderId:senderId ,
            recipientId: recipientId,
            isFriendRequest: true
      }
    );
    return res.json({ message: "Voici votre notification", friendNotification });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};

export const getFriendsNotification = async (req, res) => {
    const token = req.cookies.accessToken;
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;

  try {
   const friendsNotification = await Notification.findAll({
  where: {
    recipientId: user,
    isFriendRequest: true
     },
     include: {
       model: User,
       as: 'sender', 
       attributes: ['id', 'name', 'avatar'] 
     }
     
   });
   console.log(friendsNotification)
return res.json({
      message: "Voici les demandes d'amis", friendsNotification
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};

export const createFriendRelation = async (req, res) => {
    const token = req.cookies.accessToken;
  const userId = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  const targetId = req.body
  const user = await User.findByPk(userId);
    const target = await User.findByPk(targetId);
  try {
    user.addFriends(target)
      target.addFriends(user)
return res.json({
      message: "Voici les demandes d'amis", friendsNotification
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};