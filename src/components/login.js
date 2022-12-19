import React, { useState } from "react";
import logo7 from "../images/logo7.jpg";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
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
    const url = `/users`;
    axios.get(url).then((data) => {
      let user = data.data.filter(
        (user) => user.username == username && user.password == pass
      )
      if(user && user.length >0){
        navigate('/home');
      }
      else
      {
        alert('Invalid username or password');
      }
    });
  };
  
  return (
    <div id="home">
      <header style={{ fontSize: "50px", textAlign: "center" }}>
        Blood Bank Management System
      </header>
      <p style={{ textAlign: "center" }}>
        <img style={{ width: "30%", height: "30%" }} src={logo7} />
      </p>
      <center>
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
          
          <Link to='/signup'>Register New User</Link>
          <br></br>
          <br></br>
          <input type="submit" className="btn btn-primary" value="Login" />&nbsp;&nbsp;
          <input type="reset" className="btn btn-danger"  value="Cancel" />
        </form>
      </center>
    </div>
  );
};
export default Login;
