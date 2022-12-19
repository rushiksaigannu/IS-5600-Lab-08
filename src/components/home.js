import React, { useState } from "react";
import logo12 from "../images/logo12.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const handleClick = (e,param) => {
        navigate('/'+param);
  };
  return (
      <center>
<header style={{"fontSize":"50px"}} align="center">Blood Bank Management System</header>
<div id="content">
<img style={{"width":"20%","height":"20%"}} src={logo12}/><br></br><br></br>
<button onClick={(event) => handleClick(event,'donorlist')} className="btn btn-secondary btn-lg active">Manage Donors</button><br></br><br></br>
<button onClick={(event) => handleClick(event,'receiverlist')}  className="btn btn-secondary btn-lg active">Manage Receiver</button><br></br><br></br>
<button onClick={(event) => handleClick(event,'doctorlist')} className="btn btn-secondary btn-lg active">Manage Doctor</button><br></br><br></br>
<button onClick={(event) => handleClick(event,'inventorylist')}  className="btn btn-secondary btn-lg active">Manage Inventory</button><br></br><br></br>
<button onClick={(event) => handleClick(event,'login')} className="btn btn-secondary btn-lg active">Log out</button><br></br><br></br>
</div><br></br>
</center>
  );
};
export default Home;
