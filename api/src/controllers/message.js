import { Message, User } from "../db/sequelize.js";
import jwt from "jsonwebtoken";

export const getMessagesByChat = async (req, res) => {
    console.log(req.query)
   try {
       const messages = await Message.findAll({
           where: {
            ChatId : req.params .id
         },
          include: [
    {
      model: User,
      attributes: ["avatar", "name"],
    },
  ],
       })
       if (!messages) {
        return res.status(401).json({
        message:
          "Aucun messages trouver pour ce chat",
      });   
       }
      return res.json({ message: "voici vos messages", messages });
   } catch (error) {
     console.error(error)
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
}

export const createMessage = async (req, res) => {
  const token = req.cookies.accessToken;
  const userId = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  console.log('ouai' , req.body)
   try {
       const messages = await Message.create({
           ...req.body,
           UserId: userId
    })
      return res.json({ message: "voici le message crée", messages });
   } catch (error) {
     console.error(error)
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
}