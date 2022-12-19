import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (event, param) => {
    console.log(param);
    axios
      .post(`/deletedoctor`,{id:param}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Doctor deleted successfully");
        getDoctors();
      });
  };
  const getDoctors = (e) => {
    axios.get("/getdoctors").then((data) => {
      setDoctors(data.data);
    });
  };
  const handleAdd = (event) => {
    navigate("/doctor");
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
                      value="Add New Doctor"
                      onClick={(event) => handleAdd(event)}
                    />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{doctor.doctorname}</td>
                  <td>{doctor.doctoraddress}</td>
                  <td>{doctor.doctorcontact}</td>
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
export default DoctorsList;
