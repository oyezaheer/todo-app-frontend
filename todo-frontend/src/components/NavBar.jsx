// src/components/NavBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">TODO App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/add" className="navbar-link">Add Todo</Link>
      </div>
    </nav>
  );
};

export default NavBar;
