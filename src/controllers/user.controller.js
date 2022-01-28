const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");
const { asyncForEach } = require("../helpers/async.helper");

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    // Added Pagination for optimization
    const pageSize = parseInt(req.query.pageSize);
    const currentPage = parseInt(req.query.page);
    const userQuery = User.find().lean();
    if (pageSize && currentPage) {
      userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    userQuery.then(async (documents) => {
      const users = documents;
      await asyncForEach(users, async (user, i) => {
        const posts = await Post.find({ userId: user._id });
        users[i].posts = posts;
      });

      res.send({ users });
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};
