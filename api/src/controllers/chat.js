import jwt from "jsonwebtoken";
import { Chat } from "../db/sequelize.js";

export const getChats = async (req, res) => {
    const token = req.cookies.accessToken;
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
   try {
       const chats = await Chat.findAll({
          as:'chatUsers'
      })
      return res.json({ message: "voici vos chats", chats });
    } catch (error) {
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
}