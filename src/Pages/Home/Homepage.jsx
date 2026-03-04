import React, { useState, useEffect } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageBox from "../../components/MessageBox/MessageBox";
import NewGrp from "../../components/NewGrp/NewGrp";

const Homepage = () => {
  /* ----------------------------------
     INITIALIZE FROM LOCAL STORAGE
  ----------------------------------- */

  const [groups, setGroups] = useState(() => {
    const stored = localStorage.getItem("pocket_groups");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedGroupId, setSelectedGroupId] = useState(() => {
    const stored = localStorage.getItem("pocket_selected");
    return stored ? Number(stored) : null;
  });

  const [showModal, setShowModal] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* ----------------------------------
     SAVE GROUPS TO LOCAL STORAGE
  ----------------------------------- */

  useEffect(() => {
    localStorage.setItem("pocket_groups", JSON.stringify(groups));
  }, [groups]);

  /* ----------------------------------
     SAVE SELECTED GROUP
  ----------------------------------- */

  useEffect(() => {
    if (selectedGroupId !== null) {
      localStorage.setItem("pocket_selected", selectedGroupId);
    }
  }, [selectedGroupId]);



  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  /* ----------------------------------
     ADD NOTE
  ----------------------------------- */

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
          : group
      )
    );
  };

  /* ----------------------------------
     ADD GROUP
  ----------------------------------- */

  const addGroup = (name, color) => {
    const trimmed = name.trim();
const words = trimmed.split(" ").filter(word => word !== "");

if (words.length < 2) {
  alert("Group name must contain at least 2 words");
  return;
}

    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === trimmed.toLowerCase()
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

  /* ----------------------------------
     DERIVED SELECTED GROUP
  ----------------------------------- */

  const selectedGroup = groups.find(
    (group) => group.id === selectedGroupId
  );

  /* ----------------------------------
     RENDER
  ----------------------------------- */

  return (
    <div className="homepage">
      {showModal && (
        <NewGrp
          addGroup={addGroup}
          onClose={() => setShowModal(false)}
        />
      )}

{!isMobile && (
  <>
    <Sidebar
      groups={groups}
      selectedGroupId={selectedGroupId}
      setSelectedGroupId={setSelectedGroupId}
      openModal={() => setShowModal(true)}
    />

    <MessageBox
      selectedGroup={selectedGroup}
      addNote={addNote}
    />
  </>
)}

{isMobile && !selectedGroup && (
  <Sidebar
    groups={groups}
    selectedGroupId={selectedGroupId}
    setSelectedGroupId={setSelectedGroupId}
    openModal={() => setShowModal(true)}
  />
)}

{isMobile && selectedGroup && (
  <MessageBox
    selectedGroup={selectedGroup}
    addNote={addNote}
    goBack={() => setSelectedGroupId(null)}
  />
)}
    </div>
  );
};

export default Homepage;