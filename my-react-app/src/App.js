import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import Signin from './components/Signin';
import Signup from './components/Signup';
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
      
      
    

      
    
      <BrowserRouter>
      
            
        <Routes>
        <Route path={'/Home'} element={<Home name={userName} email={userEmail}  />} />
        <Route path={'/Signin'} element={<Signin />} />
         <Route index element={<Signup />} />
          <Route path="ListUser"element={<ListUser />} />
          <Route path="Createuser" element={<CreateUser />} />
          {/* <Route path="user/:id/edit" element={<EditUser />} /> */}
          <Route path={"ListUser/:id/edit"} element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;