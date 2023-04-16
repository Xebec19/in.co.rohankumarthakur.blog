import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  description: String,
  link: String,
  comments: [Object],
});

var model;
if (mongoose.models.PostSchema) {
  model = mongoose.models.PostSchema;
} else {
  model = mongoose.model("Post", PostSchema);
}

export default model;
