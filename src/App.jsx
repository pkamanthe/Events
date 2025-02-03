import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import EventList from "./EventList";
import AddEventForm from "./AddEventForm";
import Home from "./Home";
import Contact from "./Contact";
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

  return (
    <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-events" element={<EventList events={events.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase()))} setEvents={setEvents} />} />
          <Route path="/add-event" element={<AddEventFormWrapper setEvents={setEvents} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}


function AddEventFormWrapper({ setEvents }) {
  const navigate = useNavigate();

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    navigate("/view-events"); 
  };

  return <AddEventForm handleAddEvent={handleAddEvent} />;
}

export default App;
