import React, { useState } from 'react';
import assets from '../assets/assets';
import moment from 'moment';
import Modal from './ui/Modal';

const TaskCard = ({ task, onClick, showTaskEditScreen, handleDeleteTask }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (

    <>
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
        <div onClick={() => setIsDeleteModalOpen(true)} className='delete-container cursor-pointer'>
          <img src={assets.deleteIcon} alt="delete" />
        </div>
      </div>
    </div>
    <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="delete-task-container">
          {/* Header with Close Button */}
          <div className="text-right delete-task-header">
            <img src={assets.info} className="delete-popup-info-icon" alt="Info icon" />
            <div className="close-modal-btn" onClick={() => setIsDeleteModalOpen(false)}>
              <img src={assets.crossIcon} alt="Close popup icon" />
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="delete-popup-content">
            <p className="delete-task-text">
              Are You Sure You Want to delete <br />
              <span className="delete-task-title">{task?.title}?</span>
            </p>

            {/* Action Buttons */}
            <div className="delete-action-btns">
              <button className="btn cancel-btn" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn delete-btn"
                onClick={() => {
                  handleDeleteTask(task._id);
                  setIsDeleteModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskCard;
