const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const sequelize = require("./config/connection");

const app = new express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});

app.get("/post", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/post.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
