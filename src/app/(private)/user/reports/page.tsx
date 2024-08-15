"use client";
import PageTitle from "@/components/page-title";
import ReportCard from "@/components/report-card";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { getStudentReports } from "@/server-actions/reports";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import { message, Table } from "antd";
import React from "react";

const initialValueOfReports = {
  enrollmentsCount: 0,
  totalAmountSpent: 0,
  lastFiveEnrollments: [],
};

function UserReportsPage() {
  const [reports, setReports] = React.useState(initialValueOfReports);
  const [loading, setLoading] = React.useState(true);
  const { currentUserData } = usersGlobalStore() as IUsersGlobalStore;

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response: any = await getStudentReports(currentUserData?._id!);
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setReports(initialValueOfReports);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchReports();
  }, []);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course",
      key: "course",
      render: (text: string, record: any) => record.course.title,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: string, record: any) => `$${text}`,
    },
    {
      title: "Enrolled At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "Payment Id",
      dataIndex: "paymentId",
      key: "paymentId",
    },
  ];

  return (
    <div>
      <PageTitle title="Profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        <ReportCard
          name="Total course enrolled"
          value={reports.enrollmentsCount}
        />
        <ReportCard
          name="Total Amount Spent on Courses"
          value={reports.totalAmountSpent}
          showCurrency
        />
      </div>

      <div className="mt-7">
        <h1 className="text-sm font-bold">Last Five Enrollments</h1>
        <Table dataSource={reports.lastFiveEnrollments} columns={columns} loading={loading} />
      </div>
    </div>
  );
}

export default UserReportsPage;
