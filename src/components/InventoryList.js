import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
const InventoryList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (event, param) => {
    axios
      .post(`/updatequantity`,{bgname:param,quantity:0}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Inventory deleted successfully");
        getDoctors();
      });
  };
  const getDoctors = (e) => {
    axios.get("getinventory").then((data) => {
      setDoctors(data.data);
    });
  };
  const handleAdd = (event) => {
    navigate("/inventory");
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <div>
      <center>
        <header style={{ fontSize: "50px", textAlign: "center" }}>
          Blood Bank Management System
        </header>
        <input
                      type="button"
                      className="btn btn-primary"
                      value="Add New Inventory"
                      onClick={(event) => handleAdd(event)}
                    />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <td>Inventory ID</td>
<td>Blood Group Name</td>
<td>Quantity</td>
<td>Action</td>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{doctor.id}</td>
                  <td>{doctor.bgname}</td>
                  <td>{doctor.quantity}</td>
                  <input
                      type="button"
                      className="btn btn-primary"
                      style={{"color":"red"}}
                      value="Delete"
                      onClick={(event) => handleDelete(event, doctor.bgname)}
                    />
                </tr>
              );
            })}
          </tbody>
        </table>
        <br></br>
        <br></br>
       <Link to='/Home'>Go Back To Menu</Link>
      </center>
    </div>
  );
};
export default InventoryList;
