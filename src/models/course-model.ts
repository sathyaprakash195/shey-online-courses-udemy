import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    promoVideo: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    sections: {
      type: Array,
      required: true,
      default: [],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

if(mongoose.models && mongoose.models['courses'])
{
    delete mongoose.models['courses'];
}

const CourseModel = mongoose.model("courses", courseSchema);
export default CourseModel;