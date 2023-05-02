import { Comment, User } from "../db/sequelize.js";
import jwt from "jsonwebtoken";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll(
      {
        where:{
          PostId: req.params.id
        },
        include: {
          model: User,
          attributes: [
            'avatar'
          ]
        }
      }
    );
    return res.json({ message: "Voici les commentaires", comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};

export const postComment = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  try {
    if (!req.body.text) {
      return res.json({message:'Il vous faut un continue a votre commentaires'})
    }
    const comment = await Comment.create({
      ...req.body,
      UserId: id
    })
    return res.json({message:'Voici le commentaire crée', comment})
  } catch (error) {
     console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
}
