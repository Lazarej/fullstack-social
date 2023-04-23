import { PostModel } from "./post.js";

export const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: " cet email est deja pris",
      },
      validate: {
        isEmail: { msg: 'La valeur "email"  doit etre un email' },
        notNull: { args: true, msg: 'La valeur "email" doit etre spécifié' },
      },
    },
    avatar: {
      type: DataTypes.STRING
    },
    banner: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      password: {
          type: DataTypes.STRING,
          allowNull: false
    }
  }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
  });
};

