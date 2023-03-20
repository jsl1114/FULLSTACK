import React, { useState, useEffect } from 'react';

function SchedulingSystem() {
  // Define state variables
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({});

  // Define event handlers
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewEvent(prevState => ({ ...prevState, [name]: value }));
  }

  function handleAddEvent(event) {
    event.preventDefault();
    setEvents(prevState => [...prevState, newEvent]);
    setNewEvent({});
  }

  // Fetch events from server on component mount
  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Scheduling System</h1>
      <form onSubmit={handleAddEvent}>
        <label>
          Name:
          <input type="text" name="name" value={newEvent.name || ''} onChange={handleInputChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={newEvent.date || ''} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SchedulingSystem;