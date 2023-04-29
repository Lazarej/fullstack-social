export const CommentModel = (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
  });
};