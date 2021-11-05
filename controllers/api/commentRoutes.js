const router = require("express").Router();
const { Comment } = require("../../models");

// Creating new comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updating comment by id
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        content: req.body.content,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      },
      { where: { id: req.params.id } }
    );

    if (!commentData) {
      res.status(404).json({ message: "no comment found with this id" });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete comment by id
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (!commentData) {
      res.status(404).json({ message: "no comment found with this id" });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
