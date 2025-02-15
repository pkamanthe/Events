import React, { useState } from "react";

function EventItem({ id, name, location, category, date, events, setEvents }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newLocation, setNewLocation] = useState(location);
  const [newCategory, setNewCategory] = useState(category);
  const [newDate, setNewDate] = useState(formatDate(date));

  const base_url = "http://127.0.0.1:5000/events";

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); 
  }

  function handleSubmit(e) {
    e.preventDefault();

    
    const formattedDateTime = new Date(newDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const updatedData = {
      name: newName,
      location: newLocation,
      category: newCategory,
      event_datetime: formattedDateTime,
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

  function handleDelete(id) {
    fetch(`${base_url}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
      })
      .catch((error) => console.error("Error deleting event:", error));
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
          <button onClick={() => handleDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default EventItem;
