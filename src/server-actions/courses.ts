"use server";

import CourseModel from "@/models/course-model";
import { revalidatePath } from "next/cache";

export const createCourse = async (data: any) => {
  try {
    data.price = parseFloat(Number(data.price).toFixed(2));
    await CourseModel.create(data);
    revalidatePath("/admin/courses");
    return {
      success: true,
      message: "Course created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllCourses = async (searchParams: any) => {
  try {
    let filtersObj = {};
    if (searchParams.category) {
      filtersObj = { category: searchParams.category };
    }

    if (searchParams.search) {
      filtersObj = {
        ...filtersObj,
        title: { $regex: searchParams.search, $options: "i" },
      };
    }
    const courses = await CourseModel.find(filtersObj).sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(courses)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCourseById = async (id: string) => {
  try {
    const course = await CourseModel.findById(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editCourse = async (id: string, data: any) => {
  try {
    data.price = parseFloat(Number(data.price).toFixed(2));
    await CourseModel.findByIdAndUpdate(id, data);
    revalidatePath("/admin/courses");
    return {
      success: true,
      message: "Course updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteCourse = async (id: string) => {
  try {
    await CourseModel.findByIdAndDelete(id);
    revalidatePath("/admin/courses");
    return {
      success: true,
      message: "Course deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
