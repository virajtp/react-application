import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Report from './pages/report';
import AllTasks from './components/task_management/AllTasks';
import AddTask from './components/task_management/AddTask';
import EditTask from './components/task_management/EditTask';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/allTasks" element={<AllTasks />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;
