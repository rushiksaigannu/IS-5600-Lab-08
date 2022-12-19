import React, { useState } from "react";
import logo15 from "../images/logo15.jpg";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Doctor = () => {
  const navigate = useNavigate();
  const [doctorname, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    axios
    .post('/createdoctor', {name:doctorname,contact:phone,address:address}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {alert("Doctor added successfully"); navigate("/doctorlist")});
  };
  return (
    <div id="home">
      <header style={{ fontSize: "50px", textAlign: "center" }}>
        Blood Bank Management System
      </header>
      <p style={{ textAlign: "center" }}>
        <img style={{ width: "15%", height: "15%" }} src={logo15} />
      </p>
      <center>
        <form onSubmit={(event) => handleSumbit(event)} style={{"width":"25%"}}>
        <div className="form-group">
        <label htmlFor="doctorname">Name:</label>
        <input
            type="text"
            value={doctorname}
            className="form-control"
            id="doctorname"
            onChange={(event) => handleNameChange(event)}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            value={address}
            className="form-control"
            id="address"
            onChange={(event) => handleAddressChange(event)}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            value={phone}
            className="form-control"
            id="contact"
            onChange={(event) => handlePhoneChange(event)}
            required
          />
          </div>
          <br></br>
          <br></br>
          <input type="submit" className="btn btn-primary" value="Submit" />&nbsp;&nbsp;
          <input type="reset" className="btn btn-danger"  value="Cancel" />
          <br></br>
          <Link to='/Home'>Go Back To Menu</Link>
        </form>
      </center>
    </div>
  );
};
export default Doctor;
