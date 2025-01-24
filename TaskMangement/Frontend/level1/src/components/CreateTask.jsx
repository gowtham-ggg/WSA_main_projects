import React from "react";
import assets from "../assets/assets";
import InputField from "./ui/InputField";

const CreateTask = () => {
  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={assets.userIcon} alt="usericon" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        <InputField
          name="new-task-title"
          value=""
          onChange={() => {}}
          label="Title"
          type="text"
          inputImg={assets.titleImg}
          placeholder="Title"
        />
        <InputField
          name="new-task-description"
          value=""
          type='textarea'
          onChange={() => {}}
          label="Description"
          inputImg={assets.memo}
          placeholder="Description"
        />
        <InputField
          name="new-task-due-date"
          value=""
          type="date"
          onChange={() => {}}
          label="Due Date"
          inputImg={assets.calendar}
          placeholder="Today"
        />

    <div className="add-edit-task-btns">
        <button className="btn add-task-btn cursor-pointer">Add Task</button>
        <button className="btn cancel-task-btn cursor-pointer">cancel</button>
    </div>

      </div>
    
    </div>
  );
};

export default CreateTask;
