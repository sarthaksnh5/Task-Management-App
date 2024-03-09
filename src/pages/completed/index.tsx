import React from 'react'
import Tasks from '~/components/Tasks/Tasks'
import { useGlobalContext } from '~/context/GlobalProvider'

function index() {
  const { completedTasks } = useGlobalContext()

  return (
    <Tasks title='Completed' tasks={completedTasks} />
  )
}

export default index