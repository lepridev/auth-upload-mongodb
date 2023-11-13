import mongoose, { Schema, model, models } from "mongoose";

const ImageSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

const Image = models.Images || model("Images", ImageSchema);
export default Image;
