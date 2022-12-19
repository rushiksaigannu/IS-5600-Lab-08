import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
const DonorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (event, param) => {
    axios
      .post(`/deletedonor`,{id:param}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Donor deleted successfully");
        getDoctors();
      });
  };
  const getDoctors = (e) => {
    axios.get("/getdonors").then((data) => {
      setDoctors(data.data);
    });
  };
  const handleAdd = (event) => {
    navigate("/donor");
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
                      value="Add New Donor"
                      onClick={(event) => handleAdd(event)}
                    />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <td>Donor ID</td>
              <td>Donor Name</td>
              <td>Donor Gender</td>
              <td>Donor Address</td>
              <td>Date</td>
              <td>Quantity Donated</td>
              <td>Donor Contact</td>
              <td>Blood Group</td>
              <td>Doctorid</td>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.date}</td>
                  <td>{doctor.quantity}</td>
                  <td>{doctor.contact}</td>
                  <td>{doctor.bg}</td>
                  <td>{doctor.doctorid}</td>
                  <input
                      type="button"
                      className="btn btn-primary"
                      value="Delete"
                      style={{"color":"red"}}
                      onClick={(event) => handleDelete(event, doctor.id)}
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
export default DonorList;
