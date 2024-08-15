import PageTitle from "@/components/page-title";
import ReportCard from "@/components/report-card";
import { getAdminReports } from "@/server-actions/reports";
import { Alert } from "antd";
import React from "react";
import AdminEnrollmentsTable from "../enrollments/_components/admin-enrollments-table";

async function AdminReportsPage() {
  const response = await getAdminReports();
  if (!response.success) {
    return <Alert message={response.error} type="error" />;
  }

  return (
    <div>
      <PageTitle title="Reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        <ReportCard name="Total Courses" value={response.data.coursesCount} />
        <ReportCard
          name="Total Enrollments"
          value={response.data.enrollmentsCount}
        />
        <ReportCard
          name="Distinct Students"
          value={response.data.distinctStudentsCount}
        />
        <ReportCard
          name="Total Revenue Collected"
          value={response.data.revenue}
          showCurrency
        />
      </div>

      <div className="mt-7">
        <h1 className="text-sm font-bold">Last 5 Enrollments</h1>
        <AdminEnrollmentsTable
          enrollments={response.data.lastFiveEnrollments}
        />
      </div>
    </div>
  );
}

export default AdminReportsPage;
