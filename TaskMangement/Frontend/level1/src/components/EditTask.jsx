import React, { useState } from "react";
import assets from '../assets/assets';
import InputField from "./ui/InputField";

const EditTask = ({ task, handleEditTask ,showTaskListScreen}) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setEditedTask({ ...editedTask, due_date: date });
  };
  

  const handleSave = () => {
    handleEditTask(editedTask);
  };

 

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={assets.editTaskLogo} alt="usericon" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>
        
        <InputField
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          label="Title"
          type="text"
          inputImg={assets.titleImg}
          className="input-margin"
        />

        <InputField
          name="description"
          value={editedTask.description}
          type="textarea"
          onChange={handleChange}
          label="Description"
          inputImg={assets.memo}
          className="input-margin"
        />

        <InputField
          name="due_date"
          value={editedTask.due_date}
          type="date"
          onChange={handleDateChange}
          label="Due Date"
          inputImg={assets.calendar}
          className="input-margin"
        />

        <div className="add-edit-task-btns">
          <button onClick={handleSave} className="btn add-task-btn cursor-pointer">
            Save
          </button>
          <button className="btn cancel-task-btn cursor-pointer" onClick={showTaskListScreen}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
