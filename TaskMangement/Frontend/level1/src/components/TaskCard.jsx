import React from 'react';
import assets from '../assets/assets';
import moment from 'moment';

const TaskCard = ({ task, onClick, showTaskEditScreen, handleDeleteTask }) => {
  return (
    <div onClick={onClick} className='task-tile-container cursor-pointer'>
      <span className='task-icon-wrapper'>
        <img src={assets.blueChecked} alt="checked" className='task-icon' />
      </span>
      <div className='task-text-wrapper'>
        <p className='task-primary-text'>{task.title}</p>
        <p className='task-secondary-text'>{task.description}</p>
      </div>
      <div className='action-items-container'>
        {task.due_date && (
          <div className='flex date-container'>
            <img src={assets.alarmClock} alt="alarmClock" />
            <p className='date-text'>{moment(task.due_date).format("DD MMM YYYY")}</p>
          </div>
        )}
        <div onClick={() => showTaskEditScreen(task)} className='edit-container cursor-pointer'>
          <img src={assets.editIcon} alt="edit" />
        </div>
        <div onClick={() => handleDeleteTask(task._id)} className='delete-container cursor-pointer'>
          <img src={assets.deleteIcon} alt="delete" />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
