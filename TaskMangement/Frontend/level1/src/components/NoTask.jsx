import React from 'react'
import assets from '../assets/assets'

const NoTask = ({showCreateTaskScreen}) => {
   
  return (
    <div className='flex flex-col items-center justify-center content-section'>
        <div className='content-section-container flex flex-col justify-center '>
        <img src={assets.userIcon} alt="user with no pending" />
        <h1 className='no-task-primary-text'>Woohoo, you're all done!</h1>
        <p className='no-task-secondary-text'>
            There are no tasks added yet. Click button below to add a new task.
        </p>
        <button onClick={showCreateTaskScreen} className='btn btn-purple create-task-btn'><img src={assets.folderWhite} alt="folder" />Create Task</button>
        </div>
      
      
    </div>
  )
}

export default NoTask
