import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import TaskDetails from './pages/TaskDetails';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </div>
  );
};

export default App;

