import React from 'react';

const Navbar = () => (
  <nav className="navbar">
    <h1>EventMingle</h1>
    <div className="navbar-links">
      <a href="/">Home</a>
      <a href="/view-events">View Events</a>
      <a href="/add-event">Add Event</a>
      <a href="/contact">Contact</a>
    </div>
  </nav>
);

export default Navbar;
