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

export const getFeedPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.CUSTOM_PRIVATE_KEY).userId;

  try {
    const data = await User.findAll({
      where: {
        id: id,
      },
      include: [{
        model: User,
        as: "friends",
        include: {
          model: Post,
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
      },{model:Post, include: {
            model: User,
            attributes: { exclude: ["password"] },
          }, }]
    });

    const userPosts = await data[0].dataValues.Posts.map((post) => post.dataValues)
    const friendsPosts = await data[0].dataValues.friends.map((friend) =>
      friend.dataValues.Posts.map((post) => post)[0]
    );
    const posts =  [...userPosts, ...friendsPosts]
    return res.json({
      message: "Les posts de vos amis",
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
};


export const createPost = async(req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.CUSTOM_PRIVATE_KEY).userId;
   try {
    const post = await Post.create({
      ...req.body,
      UserId: id
    })
     return res.json({
      message: "Voici le post crée",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement ,  réesayer dans quelques instants",
    });
  }
}
