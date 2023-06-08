import jwt from "jsonwebtoken";
import { Chat, sequelize } from "../db/sequelize.js";
import { Op } from "sequelize";

export const getChats = async (req, res) => {
    const token = req.cookies.accessToken;
  const userId = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId  ;
  console.log(userId)
   try {
     const chats = await Chat.findAll({
     where: sequelize.where(
    sequelize.fn('JSON_CONTAINS', sequelize.col('members'), JSON.stringify(userId)),
    true
  )
      })
      return res.json({ message: "voici vos chats", chats });
   } catch (error) {
     console.error(error)
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
}