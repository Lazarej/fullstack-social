import { Comment, Post, User, sequelize } from "../db/sequelize.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;

    const userPosts = await Post.findAll({
      attributes: [
        "id",
        "text",
        "image",
        [sequelize.fn("COUNT", sequelize.col("comments.id")), "comment_count"],
      ],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: [],
        },
      ],
      group: ["Post.id"],
    });
    // userPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
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
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;

  try {
    const data = await User.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          as: "friends",
          include: {
            model: Post,
             attributes: {
            include: [
              [
                sequelize.fn("COUNT", sequelize.col("friends.Posts.comments.id")),
                "commentCount",
              ],
            ],
          },
            include: [
              {
                model: User,
                attributes: { exclude: ["password"] },
              },
              {
                model: Comment,
                as: "comments",
                attributes: [],
              },
            ],
          },
        },
        {
          model: Post,
          attributes: {
            include: [
              [
                sequelize.fn("COUNT", sequelize.col("Posts.comments.id")),
                "commentCount",
              ],
            ],
          },
          include: [
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
            {
              model: Comment,
              as: "comments",
              attributes: [],
            },
          ],
        },
      ],
      group: ["User.id", "friends.id", "friends.Posts.id", "Posts.id"],
    });

    const userPosts = await data[0].dataValues.Posts.map(
      (post) => post.dataValues
    );
    
    const friendsPosts = await data[0].dataValues.friends[0].Posts.map(
      (post) => post.dataValues
    );
    const posts = [...userPosts, ...friendsPosts];
    posts.sort((a, b) => new Date(b.created) - new Date(a.created));
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

export const createPost = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  try {
    console.log(req.file);
    const image = req.file ? req.file.filename : null;
    const post = await Post.create({
      ...req.body,
      image,
      UserId: id,
    });
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
};
