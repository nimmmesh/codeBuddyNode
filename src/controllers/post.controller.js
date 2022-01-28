const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");

module.exports.createPost = (req, res) => {
  try {
    const { userId, title, body: description } = req.body;

    // Validation
    if (!ObjectId.isValid(userId)) {
      return res.send({ error: "Invalid User ID" });
    }

    if (typeof title !== "string" || title.replace(/ /g, "").length < 10) {
      return res.send({ error: "Invalid Post Title" });
    }

    if (
      typeof description !== "string" ||
      description.replace(/ /g, "").length < 50
    ) {
      return res.send({ error: "Invalid Post description" });
    }

    // Inserting Data
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.send({ error: "User not found" });
        }

        Post.create({
          userId: userId,
          title: title,
          description: description,
        }).then((result) => {
          const returnObject = {
            postId: result._id,
            userId: result.userId,
            title: result.title,
            description: result.description,
          };
          return res.send({ post: returnObject });
        });
      })
      .catch((error) => {
        return res.send({ error: error.message });
      });

    // TODO: 1. Validate userId, title, description
    /**
     * Validation criteria:
     * 1. userId must be a valid ObjectId
     * 2. title must be a string and minimum of 10 characters excluding spaces
     * 3. description must be a string and minimum of 50 characters excluding spaces
     */
    // TODO: 2. Create post and return in the response
  } catch (error) {
    return res.send({ error: error.message });
  }
};
