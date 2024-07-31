import React from 'react';
import './SelectedEventCard.css'; 

const SelectedEventCard = ({ event, onDeselect }) => (
  <div className="selected-event-card">
    <div className="event-details">
      <div className="event-category">
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
    <button onClick={() => onDeselect(event)}>REMOVE</button>
  </div>
);

export default SelectedEventCard;
