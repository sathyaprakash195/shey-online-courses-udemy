import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

if(mongoose.models && mongoose.models.enrollments) {
  delete mongoose.models.enrollments;
}

const EnrollmentModel = mongoose.model("enrollments", enrollmentSchema);
export default EnrollmentModel;
