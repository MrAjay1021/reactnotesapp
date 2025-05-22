import React from 'react';

const NoteGroup = ({ name, color, selected, onClick }) => {
  const initials = name.split(' ').map(word => word[0].toUpperCase()).join('').slice(0, 2);
  
  return (
    <div className={`note-group ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="note-group-icon" style={{ backgroundColor: color }}>{initials}</div>
      <div className="note-group-name">{name}</div>
    </div>
  );
};

export default NoteGroup; 