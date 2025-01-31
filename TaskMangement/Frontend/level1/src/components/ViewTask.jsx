import React from 'react'
import assets from '../assets/assets'
import moment from 'moment'

const ViewTask = ({task,showTaskListScreen}) => {
  if (!task) return <div className="error-message">Task not found</div>;
  return (
    <>
    <div className='flex justify-between view-task-header'>
      <div className='flex'>
            <span className='task-icon-wrapper'>
                <img src={assets.blueChecked} className='task-icon' alt="check icon" />
            </span>
            <h2 className='view-task-title'>{task.title}</h2>
      </div>
      <div className='close-modal-btn' onClick={()=>showTaskListScreen()}>
            <img src={assets.crossIcon} alt="close" />
      </div>

    </div>
    <div className='flex'>
        <pre className='view-task-description'>{task.description}</pre>
        <div className='view-task-right-section'>
            {task.due_date && (<div className='view-task-info-box'>
                <p className='label-14'>Due Date</p>
                <div className='flex date-container'>
                <img src={assets.alarmClock} alt="alarm clock" /> 
                <p className='date-text'>{moment(task.due_date).format("DD MMM YYYY")}</p>
                </div>
                
                </div>)}

                <div className='view-task-info-box flex cursor-pointer' onClick={()=>{}}>
                    <img src={assets.editIcon} width={16} height={16} alt="edit icon" />
                    <p className='label-12'>Edit Task</p>
                </div>
                <div className='view-task-info-box flex cursor-pointer' onClick={()=>{}}>
                    <img src={assets.deleteIcon} width={16} height={16} alt="edit icon" />
                    <p className='label-12'>Delete Task</p>
                </div>
        </div>
    </div>
    </>
  )
}

export default ViewTask
