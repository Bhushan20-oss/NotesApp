import React from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import LockIcon from '@mui/icons-material/Lock';
const Homepage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="content">
        <img
          src="src\assets\image-removebg-preview 1.png"
          className="homeimg"
        />
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online. </p>
        <p> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

        <div className="bottom-text">        <p><LockIcon style={{top:-20}}/>end-to-end encrypted</p></div>


      </div>
    </div>
  );
};

export default Homepage;
