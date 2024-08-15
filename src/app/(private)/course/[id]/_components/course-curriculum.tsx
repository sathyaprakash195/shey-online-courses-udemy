"use client";
import { ICourse } from "@/interfaces";
import { Collapse } from "antd";
import React from "react";

const { Panel } = Collapse;

function CourseCurriculum({ course }: { course: ICourse }) {
  const text = "Content";
  return (
    <div className="mt-5">
      <h1 className="text-xl font-bold">Course Curriculum</h1>
      <div className="mt-2">
        <Collapse onChange={() => {}}>
          {course.sections.map((section, sectionIndex) => (
            <Panel header={section.name} key={sectionIndex.toString()}>
              <div className="flex flex-col gap-4">
                {section.lessons.map((lesson: any, lessonIndex: number) => (
                  <div key={lessonIndex} className="text-sm">
                    {lessonIndex + 1} : {lesson.name}
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}

export default CourseCurriculum;
