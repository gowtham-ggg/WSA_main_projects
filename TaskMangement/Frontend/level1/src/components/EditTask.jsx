import React from 'react'
import assets from '../assets/assets'
import InputField from "./ui/InputField";


const EditTask = ({task}) => {
    
  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={assets.editTaskLogo} alt="usericon" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>
        <InputField
          name="edit-task-title"
          value={task[0].title}
          onChange={() => {}}
          label="Title"
          type="text"
          inputImg={assets.titleImg}
          className = "input-margin"
         
        />
        <InputField
          name="edit-task-description"
          value={task[0].description}
          type='textarea'
          onChange={() => {}}
          label="Description"
          inputImg={assets.memo}
          className = "input-margin"
          
        />
        <InputField
          name="edit-task-due-date"
          value={task[0].due_date}
          type="date"
          onChange={() => {}}
          label="Due Date"
          inputImg={assets.calendar}
          className = "input-margin"
        />

    <div className="add-edit-task-btns">
        <button className="btn add-task-btn cursor-pointer">Save</button>
        <button className="btn cancel-task-btn cursor-pointer">cancel</button>
    </div>

      </div>
    </div>
  )
}

export default EditTask
