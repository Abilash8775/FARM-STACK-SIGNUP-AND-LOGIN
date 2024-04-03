
import './App.css';
import {BrowserRouter,Link, Route,Routes} from 'react-router-dom'
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Signup from './components/Signup.js';
function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">REACT AND FASTAPI SIGNUP AND LOGIN WITH OTP </h1>
        <BrowserRouter>
        <p><Link to="/login" className="btn btn-success">Login</Link> | <Link to="Signup" className="btn btn-success">Signup</Link></p>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
