import { Notification } from "../db/sequelize.js";
import jwt from "jsonwebtoken";


export const createFriendsNotification = async (req, res) => {
    const token = req.cookies.accessToken;
    const senderId = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
    const recipientId = req.body.id
  try {
    const friendNotification = await Notification.create(
        {
            senderId:2 ,
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