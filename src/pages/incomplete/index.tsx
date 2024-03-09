import React from 'react'
import Tasks from '~/components/Tasks/Tasks'
import { useGlobalContext } from '~/context/GlobalProvider'

function index() {
  const { incompleteTasks } = useGlobalContext()

  return (
    <Tasks title='Incomplete' tasks={incompleteTasks} />
  )
}

export default index