import { Comment } from "../db/sequelize.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.json({ message: "Voici les commentaires", comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};
