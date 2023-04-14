import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import AuthDetails from './components/AuthDetails.jsx';
import {auth} from './firebase';
function App() {

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              setUserName(user.displayName);
              setUserEmail(user.email);
          } else {
              setUserEmail("");
              setUserName("");
          }
      });
  }, []);
  return (
    <div className="App">
      <h5>React CRUD operations using PHP API and MySQL</h5>
        <div className="App">
      <SignIn />
      <SignUp />
      <AuthDetails />
    </div>
      <BrowserRouter>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Show Users</Link>
            </li> */}
            <li>
              <Link to="user/create">Create User</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path={'Home'} element={<Home name={userName} email={userEmail}  />} />
          <Route path="ListUser"element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          {/* <Route path="user/:id/edit" element={<EditUser />} /> */}
          <Route path={"ListUser/:id/edit"} element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;