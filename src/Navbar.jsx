import React from "react";

function Navbar({ searchQuery, setSearchQuery, setView }) {
  return (
    <nav className="navbar">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search Event..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => setView("all")}>All Events</button>

      {/* Add Event Button */}
      <button onClick={() => setView("add")}>➕ Add Event</button>
    </nav>
  );
}

export default Navbar;
