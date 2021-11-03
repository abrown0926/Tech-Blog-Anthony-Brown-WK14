const router = require("express").Router();
const { Blog } = require("../../models/");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    console.log(blog);

    res.render("single-post", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newBlog = await Blog.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
