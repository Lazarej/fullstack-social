import { Op } from "sequelize";
import { Post, User } from "../db/sequelize.js";
import jwt from "jsonwebtoken";

export const checkRelationStatus = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  const targetId = req.body.id;
  console.log(req.body.id);
  try {
    const user = await User.findByPk(id);
    const target = await User.findByPk(targetId);

    if (!user || !target) {
      const message =
        "Erreur lors de la recherche de l'utilisateur ! Cet utilisateur n'existe pas";
      return res.status(404).json({ message });
    }

    const areFriends = await user.hasFriends(target);
    if (areFriends) {
      return res.json({ message: "Les utilisateurs sont amis", relation: "friend" });
    }
    const sentNotifications = await user.getSentNotifications();
    const receivedNotifications = await user.getReceivedNotifications();
    const sentInvitation = sentNotifications.some(
      (notification) =>
        notification.recipientId === target.id &&
        notification.isFriendRequest === true
    );
    const receivedInvitation = receivedNotifications.some(
      (notification) =>
        notification.senderId === target.id &&
        notification.isFriendRequest === true
    );
    if (sentInvitation) {
     return res.json({
        message: "L'utilisateura envoyé une invitation de l'utilisateur",
        relation: "sent",
      });
    }
    if (receivedInvitation) {
     return res.json({
        message: "L'utilisateura recu une invitation de l'utilisateur",
        relation: "receive",
      });
    }
    return res.json({
      message: "Les utilisateurs sont pas amis",
      relation: "notfriend",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Erreur lors de la recherche, veuillez réessayer dans quelques instants",
    });
  }
};

export const  getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [Post],
    });

    if (!user) {
      const message =
        "Erreur lors de la recherche de l'utilisateur ! Cet utilisateur n'existe pas";
      return res.status(404).json({ message });
    }

    const friendsCount = await user.countFriends();

    const message = "L'utilisateur a été trouvé";
      console.log('fin de la requete')
    return res.json({ message, user, friendsCount });
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Erreur lors de la recherche, veuillez réessayer dans quelques instants",
    });
  }
};

export const putUser = async (req, res) => {
  const token = req.cookies.accessToken;
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_KEY).userId;
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  try {
    if (!req.files) {
      const update = await user.update(req.body);
      return res.json({
        message: "vous avez bien changé la propriéte correspondante",
        update,
      });
    }
    const key = Object.keys(req.files)[0];
    const file = req.files[key][0];
    const update = await user.update({
      ...req.body,
      [file.fieldname]: file.filename,
    });
    return res.json({
      message: "vous avez bien changé la propriéte correspondante",
      update,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erreur lors de la recherche ,  réesayer dans quelques instants",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || null;
      const targets = await User.findAndCountAll({
        where: { name: { [Op.like]: `%${name}%` } },
        order: ["name"],
        limit: limit,
        attributes: ["id", "avatar", "name"],
      });
      return res.json({
        message: "voici les utilisateurs avec un nom semblable",
        targets,
      });
    }
    return res.json({
      message: "Bon normalement tu as tout les utilisateur mais bon ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la recherche ,  réesayer dans quelques instants",
    });
  }
};
