import mongoose from "mongoose";

const mediaLibrarySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["media-library"]) {
  delete mongoose.models["media-library"];
}

const MediaLibraryModel = mongoose.model("media-library", mediaLibrarySchema);
export default MediaLibraryModel;
