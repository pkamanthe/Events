import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import EventList from './EventList';
import AddEventForm from './AddEventForm';
import Home from './Home';
import Contact from './Contact';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/view-events" 
            element={<EventList events={events} setEvents={setEvents} />} 
          />
          <Route 
            path="/add-event" 
            element={<AddEventFormWrapper setEvents={setEvents} />} 
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}


function AddEventFormWrapper({ setEvents }) {
  const navigate = useNavigate();

  const handleAddEvent = (newEvent) => {
    fetch('http://127.0.0.1:5000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
    .then((res) => res.json())
    .then((data) => {
      setEvents((prevEvents) => [...prevEvents, data]);
      navigate('/view-events');
    })
    .catch((error) => console.error('Error adding event:', error));
  };

  return <AddEventForm handleAddEvent={handleAddEvent} />;
}

export default App;
