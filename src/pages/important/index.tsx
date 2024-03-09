import React from 'react'
import Tasks from '~/components/Tasks/Tasks'
import { useGlobalContext } from '~/context/GlobalProvider'

function index() {
  const { importantTasks } = useGlobalContext()

  return (
    <Tasks title='Important' tasks={importantTasks} />
  )
}

export default index