const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  userId: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true,
  },
  status: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("blog", PostSchema);

module.exports = Post;
