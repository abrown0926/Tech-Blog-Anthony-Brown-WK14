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
  // User has one:many relationship to Comment. One user can have many comments
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  // Comment has many:one relationship to user. Many comments can belong to one user
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  // Blog post has many:one relationship to comment. One blog post can have many comments
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  // Comment has many:one relationship to blogpost. Many comments can belong to one blog post
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
