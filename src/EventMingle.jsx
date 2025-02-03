import React, { useState, useEffect } from "react";
import EventItem from "./EventItem"; 

function EventMingle({ events, setEvents }) {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredEvents, setFilteredEvents] = useState(events); 

  useEffect(() => {
    setFilteredEvents(events); 
  }, [events]);

  
  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  return (
    <div className="event-mingle">
      <header>
        <nav className="nav-bar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#view-events">View Events</a></li>
            <li><a href="#add-event">Add Event</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="welcome-section">
          <h1>Welcome to EventMingle!</h1>
          <p>Discover and manage events effortlessly.</p>
        </div>

        <section className="event-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventItem
                key={event.id}
                name={event.name}
                location={event.location}
                category={event.category}
                date={new Date(event.event_datetime).toLocaleString()} 
                id={event.id}
                events={events}
                setEvents={setEvents}
              />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default EventMingle;
