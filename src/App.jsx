import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; 
import EventList from "./EventList"; 
import AddEventForm from "./AddEventForm"; 
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

    useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  
  const handleAddEvent = (newEvent) => {
   
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setView("all"); 
  };


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
          handleAddEvent={handleAddEvent} 
        />
      )}
    </div>
  );
}

export default App;
