import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.css';
import TaskMain from './components/TaskMain';
import NoTask from './components/NoTask';
import Copyright from './components/Copyright';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <TaskMain />
      
      <Copyright />
    </div>
  );
};

export default App;
