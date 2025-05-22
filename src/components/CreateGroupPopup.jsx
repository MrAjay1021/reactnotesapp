import React, { useState } from 'react';

const CreateGroupPopup = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && selectedColor) {
      onCreateGroup({ name: groupName, color: selectedColor });
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div className="form-group">
            <label>Choose colour</label>
            <div className="color-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          <button type="submit" className="create-button" disabled={!groupName || !selectedColor}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPopup; 