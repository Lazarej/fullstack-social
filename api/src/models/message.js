export const MessageModel = (sequelize, DataTypes) => {
  return sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      },
      text: {
         type: DataTypes.STRING
      }

  }, {
    timestamps: true, 
  });
};