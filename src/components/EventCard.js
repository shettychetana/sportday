
import React from 'react';
import './EventCard.css'; 

const EventCard = ({ event, onSelect }) => (
  <div className="event-card">
    <div className="event-details">
      <div className="event-category" >
        {event.event_category.charAt(0)}
      </div>
      <div className="event-info">
        <h3>{event.event_name}</h3>
        <p>{event.event_category}</p>
        <p>
          {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
          {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
    <button onClick={() => onSelect(event)}>SELECT</button>
  </div>
);

export default EventCard;
