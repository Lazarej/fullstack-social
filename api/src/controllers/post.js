
import { Post, User } from "../db/sequelize.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const id = jwt.verify(token, process.env.CUSTOM_PRIVATE_KEY).userId;

    const userPosts = await Post.findAll({
      where: {
        UserId: id,
      },
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });

    return res.json({ message: "Voici les posts", userPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};

export const getFriendsPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.CUSTOM_PRIVATE_KEY).userId;

  try {
    const data = await User.findAll({
      where: {
        id: id,
      },
      include: [{ 
    model: User, 
    as: 'friends', 
    include: [{ model: Post }] 
  }]
    });
      const friends = data[0].dataValues.friends

      const posts = await friends.map((friend) => friend.dataValues.Posts.map((post) => post));

      return res.json({
          message: "Les posts de vos amis",
          posts
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};
