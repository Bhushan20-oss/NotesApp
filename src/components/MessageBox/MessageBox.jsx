import React, { useState } from "react";
import "./MessageBox.css";
import SendIcon from "@mui/icons-material/Send";
import LockIcon from "@mui/icons-material/Lock";
const MessageBox = ({ selectedGroup, addNote, goBack }) => {
  const [message, setMessage] = useState("");

  // Format date + time nicely
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} • ${formattedTime}`;
  };

  const handleSend = () => {
    if (!message.trim()) return;

    addNote(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // If no group selected
  if (!selectedGroup) {
    return (
      <>
        <div className="content">
          <img
            src="src\assets\image-removebg-preview 1.png"
            className="homeimg"
          />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online. </p>
          <p> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>

        <div className="bottom-text">
          {" "}
          <p>
            <LockIcon />
            end-to-end encrypted
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="page">
      {/* TOP NAVBAR */}
<div className="navbar">
  {goBack && (
    <span
      style={{ cursor: "pointer", fontSize: "20px" }}
      onClick={goBack}
    >
      ←
    </span>
  )}

  <div className="profile-circle">
    {selectedGroup.name.slice(0, 2).toUpperCase()}
  </div>

  <h3 className="title">{selectedGroup.name}</h3>
</div>

      {/* NOTES AREA */}
      <div className="notes-container">
        {selectedGroup.notes.length === 0 ? (
          <p style={{ color: "gray" }}>No notes yet</p>
        ) : (
          selectedGroup.notes.map((note) => (
            <div key={note.id} className="note-card">
              <p>{note.content}</p>
              <div className="note-time">{formatDateTime(note.createdAt)}</div>
            </div>
          ))
        )}
      </div>

      {/* MESSAGE INPUT */}
      <div className="msg-container">
        <textarea
          className="msg-box"
          placeholder="Here’s the sample text for sample work"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className={`send-btn ${message.trim() ? "active" : "disabled"}`}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
