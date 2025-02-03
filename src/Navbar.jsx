import React from "react";

function Navbar({ searchQuery, setSearchQuery, setView }) {
  return (
    <nav className="navbar">
    
      <button onClick={() => setView("home")}>🏠 Home</button>
      <button onClick={() => setView("events")}>📅 Events</button>

  
      <input
        type="text"
        placeholder="Search Event..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick={() => setView("all")}>📌 All Events</button>

      
      <button onClick={() => setView("add")}>➕ Add Event</button>
    </nav>
  );
}

export default Navbar;
