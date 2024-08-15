import PageTitle from "@/components/page-title";
import { IEnrollment } from "@/interfaces";
import { getAllEnrollments } from "@/server-actions/enrollments";
import { Alert } from "antd";
import React, { Suspense } from "react";
import AdminEnrollmentsTable from "./_components/admin-enrollments-table";
import CourseFilter from "./_components/course-filter";
import LoadingState from "../courses/loading";

async function EnrollmentsPage({ searchParams }: { searchParams: any }) {
  const response = await getAllEnrollments(searchParams.course);
  if (!response.success) {
    return <Alert message={response.message} type="error" />;
  }

  const enrollments: IEnrollment[] = response.data;
  return (
    <div>
      <PageTitle title="Enrollments" />
      <CourseFilter />
      <AdminEnrollmentsTable enrollments={enrollments} />
    </div>
  );
}

function Page({ searchParams }: any) {
  return (
    <Suspense fallback={<LoadingState />}>
      <EnrollmentsPage searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
