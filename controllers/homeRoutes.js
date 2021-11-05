const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Homepage
router.get("/", withAuth, async (req, res) => {
  try {
    // Link post with user
    const blogPostData = await Post.findAll({
      include: [{ model: User }],
    });

    const blogPost = blogPostData.map((post) => post.get({ plain: true }));

    res.render("home", { blogPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Links user to comments
router.get("/post/:id", async (req, res) => {
  try {
    const blogPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render("post", { blogPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render registration page
router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render New Post page
router.get("/newPost", (req, res) => {
  try {
    res.render("newPost");
  } catch (err) {
    res.status(500).json(err);
  }
});

// render editPost page
router.get("/editPost/:id", async (req, res) => {
  try {
    const blogPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    const blogPost = blogPostData.get({ plain: true });

    res.render("editPost", { blogPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by id linked to comments
router.get("/user/all/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Post }, { model: Comment }],
    });

    if (!userData) {
      res.status(404).json({ message: "No users found with this id" });
    } else {
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get post by id linked to user
router.get("/post/all/:id", async (req, res) => {
  try {
    const blogPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog posts found with this id" });
    } else {
      res.status(200).json(blogPostData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comment by id linked to user
router.get("/comment/all/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: User }, { model: Post }],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comments found with this id" });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
