const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
