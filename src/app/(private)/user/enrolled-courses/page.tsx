"use client";
import PageTitle from "@/components/page-title";
import Spinner from "@/components/spinner";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IEnrollment } from "@/interfaces";
import { getStudentEnrollments } from "@/server-actions/enrollments";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import { Alert, message } from "antd";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function EnrolledCoursePage() {
  const { currentUserData } = usersGlobalStore() as IUsersGlobalStore;
  const [enrollments, setEnrollments] = React.useState<IEnrollment[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await getStudentEnrollments(currentUserData?._id!);
      if (response.success) {
        setEnrollments(response.data);
      } else {
        message.error(response.message);
        setError(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div>
      <PageTitle title="Enrolled Courses" />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {enrollments.map((enrollment) => (
          <div
            className="flex flex-col border border-gray-500 cursor-pointer"
            onClick={() =>
              router.push(
                `/user/enrolled-courses/watch/${enrollment.course._id}`
              )
            }
            key={enrollment._id}
          >
            <img
              src={enrollment.course.coverImage}
              alt=""
              className="h-40 w-full object-cover rounded-sm"
            />
            <div className="p-3 bg-gray-100">
              <h1 className="text-sm font-semibold">
                {enrollment.course.title}
              </h1>
              <span className="text-xs">
                Enrolled on : {getDateTimeFormat(enrollment.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledCoursePage;
