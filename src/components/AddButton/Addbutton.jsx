import React from "react";
import "./Addbutton.css";
import AddIcon from "@mui/icons-material/Add";

const Addbutton = ({ addGroup, openModal}) => {


  return (
    <div className="add-btn-container">
      <button className="add-btn" onClick={openModal}>
        <AddIcon />
      </button>
    </div>
  );
};

export default Addbutton;