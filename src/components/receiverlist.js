import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
const ReceiverList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (event, param) => {
    axios
      .post(`/deletereceiver`,{id:param}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Receiver deleted successfully");
        getDoctors();
      });
  };
  const handleAdd = (event) => {
    navigate("/receiver");
  };
  const getDoctors = (e) => {
    axios.get("/getreceiver").then((data) => {
      setDoctors(data.data);
    });
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
                      value="Add New Receiver"
                      onClick={(event) => handleAdd(event)}
                    />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <td>Receiver ID</td>
<td>Receiver Name</td>
<td>Receiver Gender</td>
<td>Receiver Address</td>
<td>Receiving Date</td>
<td>Quantity Received</td>
<td>Receiver Contact</td>
<td>Receiver Blood Group</td>
<td>Doctorid</td>
<td>Action</td>
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
export default ReceiverList;
