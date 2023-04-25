import { Post, User } from "../db/sequelize.js";
import jwt from "jsonwebtoken";


export const getUserById = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
            include:[ {
                model: Post,
            }, {
              model: User,
              as: 'friends'
            }]
      });
      if (!user) {
        const message =
          "Erreur lors de la recherche de l'utilisateur ! Cet utilisateur n'existe pas";
        return res.status(404).json({ message });
      }
      const message = "L'utilisateur a été trouvé";
      return res.json({ message, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
    }
}

export const putUser = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  const user = await User.findByPk(id)
  try {
    if (!req.files) {
    const update = await user.update(req.body)
    return res.json({message: 'vous avez bien changé la propriéte correspondante' , update})
    }
    const key = Object.keys(req.files)[0]
    const file = req.files[key][0]
   const update = await user.update({
      ...req.body,
      [file.fieldname]: file.filename ,
    })
    return res.json({message: 'vous avez bien changé la propriéte correspondante' , update})
    
    
  } catch (error) {
    console.log(error)
     return res.status(500).json({
        message:
          "Erreur lors de la recherche ,  réesayer dans quelques instants",
      });
  }
}