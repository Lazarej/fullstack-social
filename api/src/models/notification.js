export const NotificationModel = (sequelize, DataTypes) => {
  return sequelize.define("Notification", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      },
     isFriendRequest: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true, 
  });
};






