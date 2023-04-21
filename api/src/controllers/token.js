import jwt from "jsonwebtoken";

export const getRefreshToken = async (req, res) => {
  try {
    const refreshToken = await req.cookies.refreshToken;
    const token = await req.cookies.accesstoken;

    if (!refreshToken)
      return res.status(401).json({ message: "Vous n'etes pas connecté" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      (error, decodeRefreshToken) => {
        if (error) {
          return res.status(401).json({
            message:
              "Le refreshToken n'est pas autoriser a accéder a ces ressources",
          });
        }
        const userId = decodeRefreshToken.userId;
        console.log("user id for see", userId);
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
            .json({});
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
