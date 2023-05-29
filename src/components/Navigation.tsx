import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
      <span>TO-DO APP</span>
      <span>
        <Link to="/" className="mr-2">
          About
        </Link>
        <Link to="/tasks">Your tasks</Link>
      </span>
    </nav>
  );
}

export default Navigation;
