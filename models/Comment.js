const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

//this model might need a FK reference to User later?

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // value at creation will be current datetime
    },
    user_id: {
      type: Sequelize.INTEGER, // this is a foreign key which references User.id
      references: {
        model: "user",
        key: "id",
      },
    },
    blogpost_id: {
      // this is a foreign key which references Blogpost.id
      type: Sequelize.INTEGER,
      references: {
        model: "blogpost",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
