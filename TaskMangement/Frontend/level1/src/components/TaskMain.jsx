import React, { useCallback, useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Loading from "./ui/Loading";
import TaskList from "./TaskList";
import Header from './Header';
import fetchTaskApi from "./api/fetchTask";
import { toast } from "react-toastify";
import NoTask from "./NoTask";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import deleteTaskApi from "./api/deleteTask";
import updateTaskApi from "./api/updateTask";

const TaskMain = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [currComponent, setCurrComponent] = useState("loading");

  // Screen control functions
  const showNoTaskScreen = useCallback(() => setCurrComponent("noTask"), []);
  const showCreateTaskScreen = useCallback(() => setCurrComponent("createTask"), []);
  const showTaskListScreen = useCallback(() => setCurrComponent("taskList"), []);
  const showTaskEditScreen = useCallback((task) => {
    setActiveTask(task);
    setCurrComponent("taskEdit");
  }, []);
  const showTaskViewScreen = useCallback(() => setCurrComponent("taskView"), []);

  const fetchAllTasks = useCallback(() => {
    setLoading(true);
    fetchTaskApi(setLoading, handleError, handleResponse);
  }, []);

  const handleResponse = useCallback((responseData) => {
    const extractedTasks = responseData?.tasks || [];
    setTasks(extractedTasks);
    extractedTasks.length ? showTaskListScreen() : showNoTaskScreen();
    setLoading(false);
  }, []);

  const handleError = useCallback((errorMessage) => {
    toast.error(errorMessage);
    setLoading(false);
  }, []);

  const handleEditTask = useCallback((updatedTask) => {
    updateTaskApi(setLoading, handleError, (responseData) => {
      console.log("Updated Task Response:", responseData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? { ...task, ...responseData } : task))
      );
      toast.success("Task updated successfully!");
      showTaskListScreen();
    }, updatedTask._id, updatedTask);


  }, []);
  

  const handleDeleteTask = useCallback((taskId) => {
    deleteTaskApi(setLoading, handleError, () => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully!");
      if (tasks.length - 1 === 0) showNoTaskScreen();
    }, taskId);
  }, [tasks]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);



  return (
    <>
      <Header />
      {currComponent === "loading" && <Loading />}
      {currComponent === "noTask" && <NoTask showCreateTaskScreen={showCreateTaskScreen} />}
      {currComponent === "createTask" && <CreateTask fetchAllTasks={fetchAllTasks} showTaskListScreen={showTaskListScreen} />}
      {currComponent === "taskList" && (
        <TaskList
          showTaskViewScreen={showTaskViewScreen}
          setActiveTask={setActiveTask}
          tasks={tasks}
          showCreateTaskScreen={showCreateTaskScreen}
          showTaskEditScreen={showTaskEditScreen}
          handleDeleteTask={handleDeleteTask}
        />
      )}
      {currComponent === "taskEdit" && <EditTask task={activeTask} handleEditTask={handleEditTask} showTaskListScreen={showTaskListScreen} />}
      {currComponent === "taskView" && <ViewTask task={activeTask} showTaskListScreen={showTaskListScreen} />}
    </>
  );
};

export default TaskMain;
