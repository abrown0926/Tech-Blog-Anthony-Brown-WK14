const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

// Add blog post
router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    console.log("Your post: ", newPost);
    res.json(newPost);
  } catch (err) {
    console.log("Could not add post.", err);
    res.status(500).json(err);
  }
});

// Update blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log("Your updated post: ", req.body);
    const blogPostData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (blogPostData) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with that id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
