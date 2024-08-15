"use client";
import { ICourse } from "@/interfaces";
import { getAllCourses } from "@/server-actions/courses";
import { message, Select } from "antd";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function CourseFilter() {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const router = useRouter();

  const getData = async () => {
    try {
      const response = await getAllCourses({});
      if (!response.success) {
        throw new Error(response.message);
      }
      setCourses(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full lg:w-1/2 mt-5 flex flex-col">
      <label htmlFor="Select course" className="text-sm text-gray-500">
        Select course
      </label>
      <Select
        onChange={(value) => {
          router.push(`/admin/enrollments?course=${value}`);
        }}
      >
        <Select.Option value="">All</Select.Option>
        {courses.map((course) => (
          <Select.Option key={course._id} value={course._id}>
            {course.title}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default CourseFilter;
