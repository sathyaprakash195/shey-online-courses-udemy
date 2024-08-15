"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IEnrollment } from "@/interfaces";
import { Table } from "antd";
import React from "react";

function AdminEnrollmentsTable({
  enrollments,
}: {
  enrollments: IEnrollment[];
}) {
  const columns = [
    {
      title: "Enrollment ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (student: any) => student.name,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course: any) => course.title,
    },
    {
      title: "PaymentId",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
        title : 'Amount',
        dataIndex : 'amount',
        key : 'amount',
        render : (amount : number) => `$${amount}`
    },
    {
      title: "Enrolled At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={enrollments} rowKey="_id" />
    </div>
  );
}

export default AdminEnrollmentsTable;
