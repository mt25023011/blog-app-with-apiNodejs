import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navbar-nav nav_menu">
        <li className="nav-item nav_item nav_item-active">
          <Link to="/" className="nav-link text-black">Home</Link>
        </li>
        <li className="nav-item nav_item">
          <Link to="/about" className="nav-link text-black">About</Link>
        </li>
        <li className="nav-item nav_item">
          <Link to="/blog" className="nav-link text-black">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
