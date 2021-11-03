const User = require("./User");
const Post = require("./Post");
const Blog = require("./Blog");

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.hasMany(Blog, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "userId",
});

Blog.belongsTo(Post, {
  foreignKey: "postId",
});

module.exports = { User, Blog, Post };
