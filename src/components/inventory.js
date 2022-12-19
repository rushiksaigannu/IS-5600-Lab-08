import React, { useState } from "react";
import logo17 from "../images/logo17.jpg";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Inventory = () => {
  const navigate = useNavigate();
  const [groupname, setGroupName] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleChange = (e) => {
    setGroupName(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleSumbit = (e) => {
    console.log(groupname);
    if(!groupname)
    {
      groupname =  "A+"
    }
    e.preventDefault();
    axios
    .post('/updatequantity', {bgname:groupname,quantity:quantity}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {alert("Inventory added successfully");navigate('/inventorylist');});
  };
  return (
    <div id="home">
      <center>
        <h3>Blood Bank Management System</h3>
        <img style={{"width":"20%","height":"20%"}} src={logo17}/><br></br>
        <form
          onSubmit={(event) => handleSumbit(event)}
          style={{ width: "25%" }}
        >
          <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group:</label>
            <select id="bloodgroup"  className="form-control" required onChange={(event) => handleChange(event)}>
              <option value="A+">A+</option>
              <option value="A+">A-</option>
              <option value="A+">B+</option>
              <option value="A+">AB-</option>
              <option value="A+">AB+</option>
              <option value="A+">O+</option>
              <option value="A+">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity(in ml):</label>
            <input
              type="number"
              min="0"
              value={quantity}
              className="form-control"
              id="quantity"
              onChange={(event) => handleQuantity(event)}
              required
            />
          </div>
          <br></br>
          <br></br>
          <input type="submit" className="btn btn-primary" value="Submit" />
          &nbsp;&nbsp;
          <input type="reset" className="btn btn-danger" value="Cancel" />
          <br></br>
         <Link to='/Home'>Go Back To Menu</Link>
        </form>
      </center>
    </div>
  );
};
export default Inventory;
