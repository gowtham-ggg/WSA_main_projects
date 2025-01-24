import React from "react";
import assets from "../assets/assets";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">{"\u{1F525}"}Task</p>
          <button onClick={{}} className="add-task-btn cursor-pointer">
            <img src={assets.folderWhite} alt="folder" />
            Add New Task
          </button>
        </div>
        <div className="task-list-container">
          {tasks.map((task, index) => (
            <TaskCard key={`${index}-task-card`} task={task} onClick={{}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
