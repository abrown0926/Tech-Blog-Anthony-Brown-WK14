const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
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
