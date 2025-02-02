import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Import Navbar
import EventList from "./EventList"; 
import AddEventForm from "./AddEventForm"; // Import the AddEventForm for adding new events
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [view, setView] = useState("all"); // Current view (all, add)

  // Fetch initial events from the API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the fetched data
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Handle adding a new event
  const handleAddEvent = (newEvent) => {
    // Assuming the newEvent has a structure like: { name, location, category, date }
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setView("all"); // Switch back to "all" events view after adding an event
  };

  // Filter events based on the search query
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setView={setView}
      />

      <h1>Welcome to EventMingle!!</h1>

      {view === "all" && (
        <EventList events={filteredEvents} setEvents={setEvents} />
      )}

      {view === "add" && (
        <AddEventForm
          handleAddEvent={handleAddEvent} // Pass the function to handle adding new events
        />
      )}
    </div>
  );
}

export default App;
