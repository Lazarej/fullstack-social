import { User } from "../db/sequelize.js";
import { ValidationError, UniqueConstraintError, json } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    const token =  jwt.sign({ userId: user.id }, process.env.CUSTOM_PRIVATE_KEY, {
      expiresIn: "24h",
    });
    const {password, ...data} = user.dataValues
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .json({
        message: "L' utilisateur a été trouvé avec succés",
        data,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Erreur lors de la connection ,  réesayer dans quelques instants",
    });
  }
};

export const create = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hash,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.CUSTOM_PRIVATE_KEY, {
      expiresIn: "24h",
    });
    const {password, ...data} = newUser.dataValues
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .json({
        message: "L' utilisateur a été crée avec succés",
        data,
      });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    console.log(error);
    res
      .status(500)
      .json({
        message:
          "Erreur lors de la connection ,  réesayer dans quelques instants",
      });
  }
};

export const logout = (req, res) => {};
