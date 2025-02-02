import React, { useState } from "react";

function EventItem({ id, name, location, category, date, events, setEvents }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newLocation, setNewLocation] = useState(location);
  const [newCategory, setNewCategory] = useState(category);
  const [newDate, setNewDate] = useState(formatDate(date));

  const base_url = "http://127.0.0.1:5000/events";

  // Format date for `datetime-local` input
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Extracts "YYYY-MM-DDTHH:MM"
  }

  // Handle event deletion
  function handleDelete() {
    fetch(`${base_url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        let remainingEvents = events.filter((event) => event.id !== id);
        setEvents(remainingEvents);
      })
      .catch((error) => console.error("Error deleting event:", error));
  }

  // Handle event update
  function handleSubmit(e) {
    e.preventDefault();
    const updatedData = {
      name: newName,
      location: newLocation,
      category: newCategory,
      date: new Date(newDate).toISOString(), // Convert to ISO format
    };

    fetch(`${base_url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedEvent) => {
        let updatedEvents = events.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        );
        setEvents(updatedEvents);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating event:", error));
  }

  return (
    <div className="event-item">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            required
          />
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
          <button type="submit">Update Event</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1>{name}</h1>
          <p>{location}</p>
          <p>{category}</p>
          <p>{new Date(date).toLocaleString()}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default EventItem;
