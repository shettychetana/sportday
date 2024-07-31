import React, { useState, useEffect } from 'react';
import EventCard from './components/EventCard';
import SelectedEventCard from './components/SelectedEventCard';
import { fetchEvents } from './services/EventService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.css';
import './components/EventCard.css';
import './components/SelectedEventCard.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const saved = localStorage.getItem('selectedEvents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const handleSelect = (event) => {
    if (selectedEvents.length >= 3) {
      alert('You can only select up to 3 events.');
      return;
    }

    const hasConflict = selectedEvents.some(selectedEvent => 
      (new Date(event.start_time) < new Date(selectedEvent.end_time) && new Date(event.end_time) > new Date(selectedEvent.start_time))
    );

    if (hasConflict) {
      alert('This event conflicts with another selected event.');
      return;
    }

    setSelectedEvents([...selectedEvents, event]);
  };

  const handleDeselect = (event) => {
    setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
  };

  return (
    <div className="app">
      <div className="events-list-wrapper">
        <h2 style={{ textAlign: 'center',textDecoration:"underline" }}>All Events</h2>
        <div className="events-list">
          {events.map(event => (
            <EventCard key={event.id} event={event} onSelect={handleSelect} />
          ))}
        </div>
      </div>
      <div className="selected-events-list-wrapper">
        <h2 style={{ textAlign: 'center' ,textDecoration:"underline"}}>Selected Events</h2>
        <div className="selected-events-list">
          <TransitionGroup>
            {selectedEvents.map(event => (
              <CSSTransition key={event.id} timeout={500} classNames="fade">
                <SelectedEventCard event={event} onDeselect={handleDeselect} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default App;
