import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageBox from "../../components/MessageBox/MessageBox";
import NewGrp from "../../components/NewGrp/NewGrp";
const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  /* ---------------------------
     ADD NOTE
  ---------------------------- */
  const addNote = (content) => {
    if (!selectedGroupId || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === selectedGroupId
          ? { ...group, notes: [...group.notes, newNote] }
          : group,
      ),
    );
  };

  /* ---------------------------
     ADD GROUP
  ---------------------------- */
  const addGroup = (name, color) => {
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      alert("Group name must be at least 2 characters");
      return;
    }

    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === trimmed.toLowerCase(),
    );

    if (isDuplicate) {
      alert("Group already exists");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: trimmed,
      color: color,
      notes: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    setSelectedGroupId(newGroup.id);
  };

  /* ---------------------------
     DERIVED SELECTED GROUP
  ---------------------------- */
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);

  return (
    <div className="homepage">
      {showModal && (
        <NewGrp addGroup={addGroup} onClose={() => setShowModal(false)} />
      )}
      <Sidebar
        groups={groups}
        addGroup={addGroup}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        openModal={() => setShowModal(true)}
      />

      <MessageBox selectedGroup={selectedGroup} addNote={addNote} />
    </div>
  );
};

export default Homepage;

{
  /* */
}
