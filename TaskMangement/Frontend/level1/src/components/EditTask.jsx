import React, { useState } from 'react'
import assets from '../assets/assets'
import InputField from "./ui/InputField";


const EditTask = ({task}) => {
    
  return (
    <div>
      <div className="create-task-card">
        <img src={assets.editTaskLogo} alt="usericon" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        <InputField
          name="new-task-title"
          value={task[0].title}
          onChange={() => {}}
          label="Title"
          type="text"
          inputImg={assets.titleImg}
         
        />
        <InputField
          name="new-task-description"
          value={task[0].description}
          type='textarea'
          onChange={() => {}}
          label="Description"
          inputImg={assets.memo}
          
        />
        <InputField
          name="new-task-due-date"
          value={task[0].due_date}
          type="date"
          onChange={() => {}}
          label="Due Date"
          inputImg={assets.calendar}
          
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
