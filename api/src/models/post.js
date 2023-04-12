import { UserModel } from "./user.js";

export const PostModel = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
      },
      image: {
          type: DataTypes.STRING,
          allowNull: true
    }
  }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
  });
};

