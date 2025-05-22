import React, { useState, useEffect } from "react";
import "./style.css";
import NoteGroup from "../../components/NoteGroup";
import CreateGroupPopup from "../../components/CreateGroupPopup";

export const MainPage = () => {
  const [groups, setGroups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('groups')) || [];
    } catch (error) {
      console.error('Error loading groups from localStorage:', error);
      return [];
    }
  });
  
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('notes')) || {};
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);
      return {};
    }
  });
  
  const [newNote, setNewNote] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedGroup) {
      const timestamp = new Date().toLocaleString();
      const updatedNotes = {
        ...notes,
        [selectedGroup.id]: [
          ...(notes[selectedGroup.id] || []),
          { content: newNote, timestamp, lastUpdated: timestamp }
        ]
      };
      setNotes(updatedNotes);
      setNewNote("");
    }
  };

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, { ...newGroup, id: Date.now() }]);
    setShowPopup(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('groups', JSON.stringify(groups));
    } catch (error) {
      console.error('Error saving groups to localStorage:', error);
    }
  }, [groups]);

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes to localStorage:', error);
    }
  }, [notes]);

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="text-wrapper-4">Pocket Notes</div>
        <div className="notes-list">
          {groups.map((group) => (
            <NoteGroup
              key={group.id}
              name={group.name}
              color={group.color}
              selected={selectedGroup && selectedGroup.id === group.id}
              onClick={() => handleGroupSelect(group)}
            />
          ))}
        </div>
        <div className="group" onClick={() => setShowPopup(true)}>
          <div className="overlap-group">
            <div className="text-wrapper-3">+</div>
          </div>
        </div>
      </div>
      <div className="main-content">
        {selectedGroup ? (
          <>
            <div className="selected-group-header">
              <div className="note-group-icon" style={{ backgroundColor: selectedGroup.color }}>
                {selectedGroup.name.split(' ').map(word => word[0].toUpperCase()).join('').slice(0, 2)}
              </div>
              <div className="note-group-name">{selectedGroup.name}</div>
            </div>
            <div className="notes-display">
              {notes[selectedGroup.id]?.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-timestamp">{note.timestamp}</div>
                  <div className="note-content">{note.content}</div>
                </div>
              ))}
            </div>
            <div className="note-input">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your text here..........."
                className="note-content-input"
              />
              <button onClick={handleAddNote} className="send-button">
                <img src="/img/send.svg" alt="Send" />
              </button>
            </div>
          </>
        ) : (
          <div className="welcome-screen">
            <div className="text-wrapper">Pocket Notes</div>
            <p className="send-and-receive">
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div className="text-wrapper-2">
              <img
                className="vector"
                alt="Lock"
                src="/img/lock.svg"
                style={{ width: '15px', height: '19px', display: 'inline-block', marginRight: '10px' }}
              />
              end-to-end encrypted
            </div>
          </div>
        )}
      </div>
      {showPopup && <CreateGroupPopup onClose={() => setShowPopup(false)} onCreateGroup={handleCreateGroup} />}
    </div>
  );
}; 