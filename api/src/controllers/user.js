import { Post, User } from "../db/sequelize.js";



export const getUserById = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
            include: {
                model: Post,
            }
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