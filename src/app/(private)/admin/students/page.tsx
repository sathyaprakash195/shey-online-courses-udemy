import PageTitle from '@/components/page-title'
import { getDistinctStudentsFromEnrollments } from '@/server-actions/enrollments'
import { Alert } from 'antd'
import React from 'react'
import StudentsTable from './_components/students-table'

async function DistinctStudentsPage() {
  const response = await getDistinctStudentsFromEnrollments()
  if(!response.success) {
    return <Alert message={response.message} type="error" />
  }
  return (
    <div>
        <PageTitle title="Distinct Students" />
        <StudentsTable students={response.data} />
    </div>
  )
}

export default DistinctStudentsPage