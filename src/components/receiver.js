import React, { useState,useEffect } from "react";
import logo16 from "../images/logo16.jpg";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Receiver = () => {
  const navigate = useNavigate();
  const [doctors,setDoctors] = useState([]);
  const [inventory,setInventory] = useState([]);
  const [donor, setDonor] = useState({name:"",contact:"",address:"",gender:"",bloodgroup:"",quantity:"",date:"",doctorId:""});
  const handleChange = (e) => {
    if(e.target.value)
    {
      const bgAvailable =  inventory.filter(ex=>ex.bgname == e.target.value).length;
      if(bgAvailable >0)
      {
        setDonor({ ...donor, bloodgroup: e.target.value })
      }
      else
      {
        alert("No blood available for the selected blood group!!!");
      }
    
    }
  };
  const getinventory = (e) => {
    axios.get("/getinventory").then((data) => {
      setInventory(data.data);
    });
  };
  
  const handleSumbit = (e) => {
    e.preventDefault();
    if(!donor.doctorId)
    {
     donor.doctorId = doctors[0].id
    }
    if(!donor.bloodgroup)
    {
     donor.bloodgroup = "A+"
    }
    const bgAvailable =  inventory.filter(ex=>ex.bgname == donor.bloodgroup)[0];
    console.log(bgAvailable);
    parseInt(donor.quantity)
    if(parseInt(bgAvailable.quantity) < parseInt(donor.quantity)){
      alert("Blood not available");
      return;
    }
    axios
    .post('/createreceiver', donor, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      var newquantity = parseInt(bgAvailable.quantity) - parseInt(donor.quantity);
      axios
      .post('/updatequantity', {bgname:donor.bloodgroup, quantity:newquantity}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Receiver added successfully");
      navigate("/receiverlist")
    });
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
        <img style={{ width: "15%", height: "15%" }} src={logo16} />
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
            <select id="bloodgroup" className="form-control" required   onChange={(event) => handleChange(event)}>
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
export default Receiver;
