import React, { useState,useEffect } from "react";
import logo13 from "../images/logo13.jpg";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Donor = () => {
  const navigate = useNavigate();
  const [doctors,setDoctors] = useState([]);
  const [inventory,setInventory] = useState([]);
  const [donor, setDonor] = useState({name:"",contact:"",address:"",gender:"",bloodgroup:"",quantity:"",date:"",doctorId:""});
  const getinventory = (e) => {
    axios.get("/getinventory").then((data) => {
      setInventory(data.data);
    });
  };
  const handleSumbit = (e) => {
    if(!donor.doctorId)
    {
     donor.doctorId = doctors[0].id
    }
    if(!donor.bloodgroup)
    {
     donor.bloodgroup = "A+"
    }
    e.preventDefault();
    axios
    .post('/createdonor', donor, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const bgAvailable =  inventory.filter(ex=>ex.bgname == donor.bloodgroup)[0];
      var newquantity = parseInt(bgAvailable.quantity) + parseInt(donor.quantity);
      axios
      .post('/updatequantity', {bgname:donor.bloodgroup, quantity:newquantity}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Donor added successfully");
      navigate("/donorlist") });
  };
  const getDoctors = (e) => {
    axios.get("getdoctors").then((data) => {
        setDoctors(data.data)
    });
  };
  useEffect(() => {
    getinventory();
    getDoctors();
  }
  ,[]); 
  return (
    <div id="home">
      <header style={{ fontSize: "50px", textAlign: "center" }}>
        Blood Bank Management System
      </header>
      <p style={{ textAlign: "center" }}>
        <img style={{ width: "15%", height: "15%" }} src={logo13} />
      </p>
      <center>
        <form onSubmit={(event) => handleSumbit(event)} style={{"width":"25%"}}>
          <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            className="form-control"
            id="name"
            onChange={e => setDonor({ ...donor, name: e.target.value })}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            onChange={e => setDonor({ ...donor, gender: e.target.value })}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="contact">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            onChange={e => setDonor({ ...donor, address: e.target.value })}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            onChange={e => setDonor({ ...donor, date: e.target.value })}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            onChange={e => setDonor({ ...donor, contact: e.target.value })}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="quantity">Qunatity(ml):</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            onChange={e => setDonor({ ...donor, quantity: e.target.value })}
            required
          />
          </div>
          <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group:</label>
            <select id="bloodgroup" className="form-control" required   onChange={e => setDonor({ ...donor, bloodgroup: e.target.value })}>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="AB-">AB-</option>
              <option value="AB+">AB+</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="doctorid">Selece Doctor:</label>
            <select id="doctorid" className="form-control" required  onChange={e => setDonor({ ...donor, doctorId: e.target.value })}>
            {doctors.map((doctor,index) => (
              <option value={doctor.id} key={index}>{doctor.doctorname}</option>
            ))}
          </select>
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
export default Donor;
