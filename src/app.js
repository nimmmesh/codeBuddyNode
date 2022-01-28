const express = require("express");
const { createPost } = require("./controllers/post.controller");
const { getUsersWithPostCount } = require("./controllers/user.controller");

const app = express();

// Parsing incoming request bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/posts", createPost);
app.get("/users", getUsersWithPostCount);

module.exports = app;
