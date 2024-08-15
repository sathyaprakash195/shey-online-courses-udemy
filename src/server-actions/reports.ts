"use server";

import CourseModel from "@/models/course-model";
import EnrollmentModel from "@/models/enrollment-model";
import mongoose from "mongoose";

export const getAdminReports = async () => {
  try {
    const [
      coursesCount,
      enrollmentsCount,
      distinctStudentsCount,
      revenue,
      lastFiveEnrollments,
    ] = await Promise.all([
      CourseModel.countDocuments(),
      EnrollmentModel.countDocuments(),
      EnrollmentModel.distinct("student"),
      EnrollmentModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),
      EnrollmentModel.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const data = {
      coursesCount,
      enrollmentsCount,
      distinctStudentsCount: distinctStudentsCount.length,
      revenue: revenue[0].total || 0,
      lastFiveEnrollments,
    };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: any) {
    return {
      sucecss: false,
      error: error.message,
    };
  }
};

export const getStudentReports = async (studentId: string) => {
  try {
    const studentMongoId = new mongoose.Types.ObjectId(studentId);
    const [enrollmentsCount, totalAmountSpent, lastFiveEnrollments] =
      await Promise.all([
        EnrollmentModel.countDocuments({ student: studentId }),
        EnrollmentModel.aggregate([
          {
            $match: { student: studentMongoId },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]),
        EnrollmentModel.find({ student: studentId }).populate("course")
          .sort({ createdAt: -1 })
          .limit(5)
      ]);

    const data = {
      enrollmentsCount,
      totalAmountSpent: totalAmountSpent[0]?.total || 0,
      lastFiveEnrollments,
    };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
