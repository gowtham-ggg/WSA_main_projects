import React, { useCallback } from "react";
import assets from "../assets/assets";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, setActiveTask, showTaskViewScreen, showCreateTaskScreen, showTaskEditScreen, handleDeleteTask }) => {
  const ViewTask = useCallback((task) => {
    setActiveTask(task);
    showTaskViewScreen();
  }, []);

  return (
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">{"🔥"}Task</p>
          <button onClick={() => showCreateTaskScreen()} className="add-task-btn cursor-pointer">
            <img src={assets.folderWhite} alt="folder" />
            Add New Task
          </button>
        </div>
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} showTaskEditScreen={showTaskEditScreen} handleDeleteTask={handleDeleteTask} />

          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
