const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  // User has one:many relationship to BlogPost. One user can have many blog posts
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  // BlogPost has many:one relationship to User. Many blog posts can belong to one user.
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
