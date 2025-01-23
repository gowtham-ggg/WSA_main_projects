import React from "react";
import CreateTask from "./CreateTask";
import Loading from "./ui/Loading";
import EditTask from "./EditTask";

const TaskMain = () => {
  const staticTask = [
    {
      title: "Complete React Project",
      description: "Work on the dashboard and authentication module.",
      due_date: "2025-02-01T00:00:00",
    },
    {
      title: "Team Meeting",
      description: "Discuss project milestones and deliverables with the team.",
      due_date: "2025-02-03T14:30:00",
    },
    {
      title: "Submit Assignment",
      description: "Upload the final draft of the MERN stack assignment.",
      due_date: "2025-02-05T18:00:00",
    },
  ];
  return (
    <>
    <Loading />
    <div id="container-div">
      <CreateTask />
      <EditTask task={staticTask} />
    </div>
    </>
  );
};

export default TaskMain;
