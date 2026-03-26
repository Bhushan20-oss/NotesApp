import React from "react";
import "./Sidebar.css";
import AddButton from "../AddButton/Addbutton";
import Notes from "../Notes/Notes";

const Sidebar = ({
  groups,
  addGroup,
  selectedGroupId,
  setSelectedGroupId,
  openModal,
}) => {
  return (
    <div className="container">
      <h1 className="maintext">Pocket Notes</h1>

      <Notes
        groups={groups}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
      />

      <AddButton addGroup={addGroup} openModal={openModal}/>
    </div>
  );
};

export default Sidebar;