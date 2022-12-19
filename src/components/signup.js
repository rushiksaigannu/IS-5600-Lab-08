import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    axios
    .post('/createlogin', {username:username,password:pass}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {alert("User added successfully");navigate('/login');});
  };
  return (
    <div id="home">

      <center>
      <h3>Enter Registration Details</h3>
        <form onSubmit={(event) => handleSumbit(event)} style={{"width":"25%"}}>
        <div className="form-group">
        <label htmlFor="username">Enter Username:</label>
        <input
            type="text"
            value={username}
            className="form-control"
            id="username"
            onChange={(event) => handleUserName(event)}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="passord">Enter Password:</label>
          <input
            type="password"
            value={pass}
            className="form-control"
            id="password"
            onChange={(event) => handlePass(event)}
            required
          />
          </div>
          <br></br>
          <Link to="/login">Registered Admin? Log In</Link>
          <br></br>
          <br></br>
          <input type="submit" className="btn btn-primary" value="Register" />&nbsp;&nbsp;
          <input type="reset" className="btn btn-danger"  value="Cancel" />
        </form>
      </center>
    </div>
  );
};
export default SignUp;
