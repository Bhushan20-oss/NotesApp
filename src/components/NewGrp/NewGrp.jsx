import React, { useState, useRef, useEffect } from "react";
import "./NewGrp.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const NewGrp = ({ onClose, addGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCreate = () => {
    addGroup(groupName, selectedColor);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        <h3>Create New Group</h3>

        <div className="input-row">
          <label>Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="color-row">
          <label>Choose Colour</label>
          <div className="color-options">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-circle ${
                  selectedColor === color ? "active" : ""
                }`}
                style={{ background: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <button className="create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewGrp;