import React, { useCallback, useState } from 'react';
import assets from '../assets/assets';
import InputField from './ui/InputField';
import { toast } from 'react-toastify';
import createTaskApi from './api/createTask';
import clsx from 'clsx';


const CreateTask = ({fetchAllTasks,showTaskListScreen}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [loading, setLoading] = useState(false)


  // Handle input changes
  const handleTitleChange = useCallback((e) => {
    setTaskTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setTaskDescription(e.target.value);
  }, []);

  const handleDateChange = useCallback((date) => {
    setTaskDueDate(date);
  }, []);

  // Handle API response and error
  const handleResponse = useCallback((responseData) => {
    if (responseData) {
      toast.success('Task Created');
      fetchAllTasks()
    } else {
      toast.error('Failed to create task');
    }
  }, []);

  const handleError = useCallback((errorMessage) => {
    toast.error(errorMessage);
    console.error(errorMessage);
  }, []);

  // Validate form
  const validate = useCallback(() => {
    if (taskTitle && taskDescription) {
      return true;
    } else {
      toast.error('All fields are required');
      return false;
    }
  }, [taskTitle, taskDescription]);

  // Create new task
  const createNewTask = useCallback(
    (values) => {
      createTaskApi(values, handleResponse, handleError, setLoading);
    },
    [handleResponse, handleError]
  );

  // Handle task submission
  const handleTask = useCallback(() => {
    const values = {
      taskTitle,
      taskDescription,
      taskDueDate,
    };
    if (validate()) {
      createNewTask(values);
    }
  }, [createNewTask, taskTitle, taskDescription, taskDueDate, validate]);

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={assets.userIcon} alt="usericon" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        <InputField
          name="new-task-title"
          value={taskTitle}
          onChange={handleTitleChange}
          label="Title"
          type="text"
          inputImg={assets.titleImg}
          placeholder="Title"
        />
        <InputField
          name="new-task-description"
          value={taskDescription}
          onChange={handleDescriptionChange}
          label="Description"
          type="textarea"
          inputImg={assets.memo}
          placeholder="Description"
        />
        <InputField
          name="new-task-due-date"
          value={taskDueDate}
          onChange={handleDateChange}
          label="Due Date"
          type="date"
          inputImg={assets.calendar}
          placeholder="Today"
        />

        <div className="add-edit-task-btns">
          <button
            className={clsx(
              'btn',
              'add-task-btn',
              loading ? 'disabled-add-task-btn ' : 'cursor-pointer'
            )}
            onClick={handleTask}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
          <button
            className="btn cancel-task-btn cursor-pointer"
            onClick={() => showTaskListScreen()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
