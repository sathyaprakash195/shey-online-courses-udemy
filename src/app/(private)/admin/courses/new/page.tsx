import PageTitle from '@/components/page-title'
import React from 'react'
import CourseForm from '../_components/course-form'

function NewCoursePage() {
  return (
    <div>
      <PageTitle title='New Course' />
      <CourseForm />
    </div>
  )
}

export default NewCoursePage