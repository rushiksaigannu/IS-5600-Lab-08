// import Home from './components/home';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import SignUp from './components/signup';
import Inventory from './components/inventory';
import Doctor from './components/doctor';
import Donor from './components/donor';
import Receiver from './components/receiver';
// import ViewDetails from './components/viewdetails';
import DoctorsList from './components/doctorslist';
import DonorList from './components/donorlist';
import ReceiverList from './components/receiverlist';
import InventoryList from './components/InventoryList';
import Home from "./components/home";

function App() {
  return (
    <div  className='container'>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/home"  element={<Home/>} />
            <Route path="/signup"  element={<SignUp/>} />
            <Route path="/inventory"  element={<Inventory/>} />
            <Route path="/doctor"  element={<Doctor/>} />
            <Route path="/donor"  element={<Donor/>} />
            <Route path="/receiver"  element={<Receiver/>} />
            {/* <Route path="/viewdetails"  element={<ViewDetails/>} /> */}
            <Route path="/doctorlist" exact element={<DoctorsList/>} />
            <Route path="/donorlist" exact element={<DonorList/>} />
            <Route path="/receiverlist" exact element={<ReceiverList/>} />
            <Route path="/inventorylist" exact element={<InventoryList/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
