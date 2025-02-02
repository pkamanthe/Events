import React, { useState } from "react";
import EventItem from "./EventItem"; // Assuming you have an EventItem component

function EventLists({ events, setEvents }) {
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    category: "",
    event_datetime: "" // Use event_datetime for consistency
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  }

  // Handle form submission (adding new events)
  function handleSubmit(e) {
    e.preventDefault();
    
    // Convert datetime-local input to correct format "YYYY-MM-DD HH:MM:SS"
    const formattedDateTime = new Date(eventData.event_datetime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const newEvent = { ...eventData, event_datetime: formattedDateTime };

    // Send the new event to the backend API
    fetch("http://127.0.0.1:5000/events", {  // Ensure correct endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((event) => {
        setEvents((prevEvents) => [...prevEvents, event]); // Add new event to state
        setEventData({ name: "", location: "", category: "", event_datetime: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding event:", error));
  }

  return (
    <div>
      <h2>Event List</h2>

      {/* Map through events and display each one using EventItem */}
      {events.length > 0 ? (
        events.map((event) => (
          <EventItem
            key={event.id}
            name={event.name}
            location={event.location}
            category={event.category}
            date={new Date(event.event_datetime).toLocaleString()} // Display formatted date
            id={event.id}
            events={events}
            setEvents={setEvents}
          />
        ))
      ) : (
        <p>No events available.</p>
      )}

      {/* Add Event Form */}
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

export default EventLists;
