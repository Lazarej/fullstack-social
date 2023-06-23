import jwt from "jsonwebtoken";
import { Chat, User, sequelize } from "../db/sequelize.js";
import { Op } from "sequelize";

export const getChats = async (req, res) => {
  const token = req.cookies.accessToken;
  const userId = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  console.log(userId);
  try {
    const findChats = await Chat.findAll({
      where: sequelize.where(
        sequelize.fn(
          "JSON_CONTAINS",
          sequelize.col("members"),
          JSON.stringify(userId)
        ),
        true
      ),
    });

    const chats = await Promise.all(
      findChats.map(async (chat) => {
        const members = await Promise.all(
          chat.dataValues.members.map(async (memberId) => {
            if (memberId !== userId) {
              const user = await User.findOne({
              where: {
                id: memberId,
              },
              attributes: ["avatar", "name"],
              });
            return user;
            }
          })
        );
        const filteredMembers = members.filter((member) => member !== undefined);
        return { ...chat.dataValues, filteredMembers };
      })
    );

    return res.json({ message: "voici vos chats", chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la recherche ,  réesayer dans quelques instants",
    });
  }
};
