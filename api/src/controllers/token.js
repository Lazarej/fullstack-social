import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.js";

export const getRefreshToken = async (req, res) => {
  try {
    const refreshToken = await req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "Vous n'etes pas connecté" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      async(error, decodeRefreshToken) => {
        if (error) {
          return res.status(401).json({
            message:
              "Le refreshToken n'est pas autoriser a accéder a ces ressources",
          });
        }
        const userId = decodeRefreshToken.userId;
        const user =  await User.findByPk(userId)
        if(!user) return  res.status(401).json({
            message:
              "L'utilisateur n'existe plus",
          });
        const newAccessToken = jwt.sign(
          { userId: userId },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "15m",
          }
        );
        const newRefreshToken = jwt.sign(
          { userId: userId },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: "7d" }
        );
        return res
          .cookie("accessToken", newAccessToken, {
            httpOnly: true,
          })
          .cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
          })
            .status(200)
            .json({id:userId});
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors du chargement , réesayer dans quelques instants",
    });
  }
};

export const getNewToken = async (req, res) => {};
