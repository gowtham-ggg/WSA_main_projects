import React, { useCallback, useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Loading from "./ui/Loading"
import TaskList from "./TaskList";
import Header from './Header'
import fetchTaskApi from "./api/fetchTask";
import { toast } from "react-toastify";
import NoTask from "./NoTask";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";

const TaskMain = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

    //for spa iniatilize
    const [activeTask, setActiveTask] = useState(null)
    const [currComponent, setCurrComponent] = useState("loading")
  
    //create  function to change screen
    const showNoTaskScreen = useCallback(()=>{
      setCurrComponent("noTask")
    },[])

    const showCreateTaskScreen = useCallback(()=>{
      setCurrComponent("createTask")
    },[])

    const showTaskListScreen = useCallback(()=>{
      setCurrComponent("taskList")
    },[])

    const showTaskEditScreen = useCallback(()=>{
      setCurrComponent("taskEdit")
    },[])
    const showTaskViewScreen = useCallback(()=>{
      setCurrComponent("taskView")
    },[])


  const fetchAllTasks = useCallback(()=>{
    setLoading(true)
    fetchTaskApi(setLoading, handleError, handleResponse)
  },[])

  const handleResponse = useCallback((responseData)=>{
    console.log("API Response Data", responseData)
    const extractedTasks = responseData?.tasks || []
    setTasks(extractedTasks)
    if(extractedTasks.length){
      showTaskListScreen()
    }
    else{
      showNoTaskScreen()
    }
    setLoading(false)
  },[])

  const handleError =useCallback((errorMessage)=>{
    toast.error(errorMessage)
    setLoading(false)
  },[])
  useEffect(()=>{
    fetchAllTasks()
  },[fetchAllTasks])


  

  return (
    <>
    <Header />

    {currComponent === "loading" && <Loading />}
    {currComponent === "noTask" && <NoTask showCreateTaskScreen = {showCreateTaskScreen}/>}
    {currComponent === "createTask" && <CreateTask fetchAllTasks ={fetchAllTasks} />}
    {currComponent === "taskList" && <TaskList tasks={tasks}/>}
    {currComponent === "taskEdit" && <EditTask tasks={tasks} />}
    {currComponent === "taskView" && <ViewTask tasks={tasks}/> }
    
    </>
  );
};

export default TaskMain;
