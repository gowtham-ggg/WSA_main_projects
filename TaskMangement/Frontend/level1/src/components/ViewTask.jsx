import React, { useState } from "react";
import assets from "../assets/assets";
import moment from "moment";
import Modal from "./ui/Modal";

const ViewTask = ({ task, showTaskListScreen, handleDeleteTask, showTaskEditScreen }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      {/* Main Task View Modal */}
      <Modal isOpen={true} onClose={showTaskListScreen}>
        <div className="flex justify-between view-task-header">
          <div className="flex">
            <span className="task-icon-wrapper">
              <img src={assets.blueChecked} className="task-icon" alt="check icon" />
            </span>
            <h2 className="view-task-title">{task.title}</h2>
          </div>
          <div className="close-modal-btn" onClick={showTaskListScreen}>
            <img src={assets.crossIcon} alt="close" />
          </div>
        </div>

        <div className="flex">
          <p className="view-task-description">{task.description}</p>
          <div className="view-task-right-section">
            {task.due_date && (
              <div className="view-task-info-box">
                <p className="label-14">Due Date</p>
                <div className="flex date-container">
                  <img src={assets.alarmClock} alt="alarm clock" />
                  <p className="date-text">{moment(task.due_date).format("DD MMM YYYY")}</p>
                </div>
              </div>
            )}

            {/* Edit Task */}
            <div className="view-task-info-box flex cursor-pointer" onClick={() => showTaskEditScreen(task)}>
              <img src={assets.editIcon} width={16} height={16} alt="edit icon" />
              <p className="label-12">Edit Task</p>
            </div>

            {/* Delete Task */}
            <div className="view-task-info-box flex cursor-pointer" onClick={() => setIsDeleteModalOpen(true)}>
              <img src={assets.deleteIcon} width={16} height={16} alt="delete icon" />
              <p className="label-12">Delete Task</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
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
                  showTaskListScreen()
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

export default ViewTask;
