import React, { useState, useEffect } from "react";
import EventItem from "./EventItem"; 

function EventList({ events, setEvents }) {
  
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    category: "",
    event_datetime: "", 
  });
  
  const [searchQuery, setSearchQuery] = useState(""); 

  
  const [filteredEvents, setFilteredEvents] = useState(events);

  
  function handleChange(e) {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  }

  
  function handleSubmit(e) {
    e.preventDefault();

    
    const formattedDateTime = new Date(eventData.event_datetime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const newEvent = { ...eventData, event_datetime: formattedDateTime };

    
    fetch("http://127.0.0.1:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
        setEventData({ name: "", location: "", category: "", event_datetime: "" }); 
      })
      .catch((error) => console.error("Error adding event:", error));
  }

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  return (
    <div>
      <h2>Event List</h2>
    <div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

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
        <p>No events available.</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={eventData.name}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={eventData.category}
          required
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="event_datetime"
          value={eventData.event_datetime}
          required
          onChange={handleChange}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default EventList;
