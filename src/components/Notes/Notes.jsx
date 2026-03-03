import React from "react";
import "./Notes.css";

const Notes = ({ groups, selectedGroupId, setSelectedGroupId }) => {

  const getInitials = (title) => {
    const words = title.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return (
      words[0][0].toUpperCase() +
      words[words.length - 1][0].toUpperCase()
    );
  };

  return (
    <div className="notes-container">
      {groups.map((group) => (
        <div
          key={group.id}
          className="note-list"
          onClick={() => setSelectedGroupId(group.id)}
          style={{
            background:
              selectedGroupId === group.id ? "#e5e5e5" : "transparent",
          }}
        >
          <div className="profile" style={{background: group.color}}>
            {getInitials(group.name)}
          </div>
          <h5>{group.name}</h5>
        </div>
      ))}
    </div>
  );
};

export default Notes;