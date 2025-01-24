import React from 'react'
import "./styles/style.css"
import TaskMain from './components/TaskMain'
import NoTask from './components/NoTask'
import Copyright from './components/Copyright'


const App = () => {
  return (
    <div>
      <TaskMain/>
      <NoTask/>
      <Copyright />
    </div>
  )
}

export default App
