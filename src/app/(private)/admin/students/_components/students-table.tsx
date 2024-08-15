'use client'
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IUser } from "@/interfaces";
import { Table } from "antd";
import React from "react";

function StudentsTable({ students }: { students: IUser[] }) {
  const columns = [
    {
      title: "Student ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={students} rowKey="_id" />
    </div>
  );
}

export default StudentsTable;
