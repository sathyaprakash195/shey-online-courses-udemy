"use server";

import EnrollmentModel from "@/models/enrollment-model";
import UserModel from "@/models/user-model";


export const saveEnrollment = async (payload: any) => {
  try {
    await EnrollmentModel.create(payload);
    return {
      success: true,
      message: "Enrollment saved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getStudentEnrollments = async (studentId: string) => {
  try {
    const enrollments = await EnrollmentModel.find({ student: studentId })
      .populate("course")
      .sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(enrollments)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllEnrollments = async (courseId: string) => {
  try {
    const filtersObj = courseId ? { course: courseId } : {};
    const enrollments = await EnrollmentModel.find(filtersObj)
      .populate("course")
      .populate("student")
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(enrollments)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getDistinctStudentsFromEnrollments = async () => {
  try {

    const distinctStudentIds = await EnrollmentModel.distinct("student").populate("student")
    const distinctStudents = await UserModel.find({
      _id: { $in: distinctStudentIds },
    }).sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(distinctStudents)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
