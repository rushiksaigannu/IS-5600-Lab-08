import React, { useState, useEffect } from "react";
import Header from "./layout/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (event, param) => {
    axios
      .delete(`http://localhost:3000/bus/delete/${param}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Bus deleted successfully");
        fetchBusData();
      });
  };
  const handleAdd = (event) => {
    navigate("/registerbus");
  };
  const fetchBusData =  () =>{
    const url = "http://localhost:3000/bus/getall";
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => setBuses(data));
  }
  useEffect(() => {
    fetchBusData()
  }, []);
  return (
    <div>
      <Header />
      <div style={{textAlign: 'left'}}>
        <br></br>
      <input
                      type="button"
                      className="btn btn-primary"
                      value="Add New Bus"
                      onClick={(event) => handleAdd(event)}
                    />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bus Name</th>
              <th scope="col">Bus Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{bus.busname}</td>
                  <td>{bus.busno}</td>
                  <td>
                    <input
                      type="button"
                      className="btn btn-primary"
                      value="Edit"
                      onClick={(event) => handleDelete(event, bus.busid)}
                    />
                    &nbsp; &nbsp;
                    <input
                      type="button"
                      className="btn btn-danger"
                      value="Delete"
                      onClick={(event) => handleDelete(event, bus.busid)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageBuses;
