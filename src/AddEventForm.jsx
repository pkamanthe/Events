import React, { useState } from 'react';

function AddEventForm({ events, setEvents }) {
  // Initializing state for form inputs
  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    category: '',
    event_datetime: '', // Store as a string for consistency
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Validate if all fields are filled
    if (!eventData.name || !eventData.location || !eventData.category || !eventData.event_datetime) {
      alert('Please fill in all the fields');
      return;
    }

    // Convert the datetime from input to the correct format (YYYY-MM-DD HH:MM:SS)
    const formattedDateTime = new Date(eventData.event_datetime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // This ensures the format is "YYYY-MM-DD HH:MM:SS"

    const newEvent = { ...eventData, event_datetime: formattedDateTime };

    // Send the new event to the backend (assuming the backend API is running at this URL)
    fetch("http://127.0.0.1:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((event) => {
        setEvents((prevEvents) => [...prevEvents, event]); // Add new event to state
        setEventData({ name: '', location: '', category: '', event_datetime: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding event:', error));
  }

  return (
    <div>
      <h2>Add New Event</h2>

      {/* Form for adding an event */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={eventData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={eventData.category}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="event_datetime"
          value={eventData.event_datetime}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEventForm;
