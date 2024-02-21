import React, { useState } from 'react';

const AddEventPopup = ({ onSubmit, onClose }) => {
  // Initialize start and end states with current date and time
  const [start, setStart] = useState(new Date().toISOString().slice(0, -8));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, -8));

  // State for the event title
  const [title, setTitle] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    if (title && start && end) {
      onSubmit({ title, start, end });
      onClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="popup">
      <h2>Add Event</h2>
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Event</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddEventPopup;
