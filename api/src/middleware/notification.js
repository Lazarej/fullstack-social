import { Notification, Post, User } from "../db/sequelize.js";

export const sendNotification = async (req, res, next) => {
  const originalSend = res.send;

  res.send = async function (body) {
    // Capturez la réponse ici avant qu'elle ne soit envoyée
    const responseSent = body;
    const transformeResponseSent = JSON.parse(body);
     
    try {
      if (responseSent.includes("comment")) {
        const target = await Post.findByPk(
          transformeResponseSent.comment.PostId,
          {
            attributes: [],
            include: {
              model: User,
              attributes: ["id"],
            },
          }
        );
         const userId = transformeResponseSent.comment.UserId
         const targetId =  target.User.id
        if (userId !== targetId) {
          const notification = await Notification.create({
          senderId: userId,
          recipientId: targetId,
          action: "comment",
        });
        }
      }
    } catch (error) {
      console.error(error);
    }

    // Appelez la fonction send d'origine pour envoyer la réponse normalement
    originalSend.call(this, body);
  };

  next();
};
