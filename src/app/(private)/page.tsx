import { ICourse } from "@/interfaces";
import { getAllCourses } from "@/server-actions/courses";
import { Alert } from "antd";
import Link from "next/link";
import Filters from "./_components/filters";

export default async function Home({ searchParams }: { searchParams: any }) {
  const response = await getAllCourses(searchParams);
  if (!response.success) {
    return <Alert message={response.message} type="error" />;
  }

  const courses: ICourse[] = response.data;
  return (
    <div className="flex flex-col">
      <Filters />
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5 mt-5">
        {courses.map((course) => (
          <Link key={course._id} href={`/course/${course._id}`}>
            <div className="flex flex-col border">
              <img
                src={course.coverImage}
                alt={course.title}
                className="h-52"
              />
              <div className="p-3 bg-gray-100">
                <div className="flex flex-col justify-between">
                  <div>
                    <h1 className="text-sm font-semibold">{course.title}</h1>
                    <p className="text-xs">{course.subTitle}</p>
                  </div>

                  <h1 className="text-xl font-bold text-green-700 mt-2">
                    $ {course.price.toFixed(2)}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <Alert message="No courses found" type="info" className="mt-5" showIcon/>
      )}
    </div>
  );
}
