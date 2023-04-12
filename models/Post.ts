import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  description: String,
  link: String,
  comments: [Object],
});

module.exports =
  mongoose.models.PostSchema || mongoose.model("Post", PostSchema);
