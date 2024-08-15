"use client";
import Spinner from "@/components/spinner";
import { ICourse } from "@/interfaces";
import { getCourseById } from "@/server-actions/courses";
import { Alert, Collapse } from "antd";
const { Panel } = Collapse;
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function WatchCoursePage() {
  const [course, setCourse] = React.useState<ICourse | null>(null);
  const params: any = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [selectedLesson, setSelectedLesson] = React.useState<any>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCourseById(params.id!);
      if (response.success) {
        setCourse(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
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
      {course && (
        <>
          {" "}
          <h1 className="text-xl font-bold">{course.title}</h1>
          <div className="grid grid-cols-3 mt-5 gap-10">
            <div className="col-span-2">
              <h1 className="text-sm mb-2">
                {selectedLesson?.name || "Course Introduction"}
              </h1>
              <video
                controls
                className="w-full  border border-primary rounded"
                title="video"
                src={selectedLesson?.video || course?.promoVideo}
              ></video>
            </div>
            <div className="col-span-1">
              <h1 className="text-sm font-bold">Course Curriculum</h1>
              <div className="mt-2">
                <Collapse onChange={() => {}}>
                  {course.sections.map((section, sectionIndex) => (
                    <Panel header={section.name} key={sectionIndex.toString()}>
                      <div className="flex flex-col gap-1">
                        {section.lessons.map(
                          (lesson: any, lessonIndex: number) => (
                            <div
                              key={lessonIndex}
                              className={`text-sm p-3 rounded-sm cursor-pointer ${
                                selectedLesson?.name === lesson.name
                                  ? "bg-gray-200 border border-primary"
                                  : ""
                              }`}
                              onClick={() => setSelectedLesson(lesson)}
                            >
                              {lessonIndex + 1} : {lesson.name}
                            </div>
                          )
                        )}
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WatchCoursePage;
