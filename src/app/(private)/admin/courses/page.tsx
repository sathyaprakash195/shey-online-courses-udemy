import PageTitle from "@/components/page-title";
import { getAllCourses } from "@/server-actions/courses";
import { Alert, Button } from "antd";
import Link from "next/link";
import React from "react";
import CoursesTable from "./_components/courses-table";

async function AdminCoursesPage() {
  const coursesResponse = await getAllCourses({});
  if (!coursesResponse.success) {
    return <Alert message="Failed to fetch courses" type="error" />;
  }
  const courses = coursesResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Courses" />
        <Button>
          <Link href="/admin/courses/new">New Course</Link>
        </Button>
      </div>

      <CoursesTable courses={courses} />
    </div>
  );
}

export default AdminCoursesPage;
