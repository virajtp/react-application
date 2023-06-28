import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<TaskList />} />
              <Route path="/new" element={<AddTask /> } />
      </Routes>
    </Router>
  );
};

export default App;
