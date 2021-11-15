const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.status(400).json({ message: "Incorrect username, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
      // res.render("home");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/registerUser", async (req, res) => {
  try {
    const newUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(newUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//   try {
//     const userAlreadyExist = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });
//     if (!userAlreadyExist) {
//       const userData = await User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       });

//       req.session.save(() => {
//         req.session.loggedIn = true;

//         res.status(200).json(userData);

//         res.render("home");
//       });
//     } else {
//       res.status(500).json("This email already exists!");
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
