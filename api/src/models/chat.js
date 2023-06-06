
export const ChatModel = (sequelize, DataTypes) => {
  return sequelize.define("Chat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    timestamps: true, 
  });
};