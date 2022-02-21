const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");
const { asyncForEach } = require("../helpers/async.helper");

let users;

const mapUserPostData = async (user, i) => {
  const posts = await Post.find({ userId: user._id });
  users[i].posts = posts;
};

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    users = await User.find({}).lean();
    await asyncForEach(users, mapUserPostData);
    res.send({ users });
  } catch (error) {
    res.send({ error: error.message });
  }
};
