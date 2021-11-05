const router = require("express").Router();
const { User, Post } = require("../../models");

// New post
router.post("/newPost", async (req, res) => {
  const postData = await User.findOne({
    where: { username: req.body.username },
  });

  if (!postData) {
    res
      .status(400)
      .json({ message: "Incorrect username, please enter valid username" });
    res.render("home");
    return;
  }

  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: postData.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete post by id
router.delete("/:id", async (req, res) => {
  try {
    const bpData = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!bpData) {
      res.status(404).json({ message: "no blog post found with this id" });
    } else {
      res.status(200).json(bpData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit post by id
router.put("/:id", async (req, res) => {
  try {
    const bpData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );

    if (!bpData) {
      res.status(404).json({ message: "no blog post found with this id" });
    } else {
      res.status(200).json(bpData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
