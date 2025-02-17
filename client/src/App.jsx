// import React from 'react'
// import {Routes, Route} from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import ResetPassword from './pages/ResetPassword'
// import { ToastContainer, toast } from 'react-toastify';
// import EmailVerify from './pages/EmailVerify'
// import axios from "axios";


// const App = () => {

//   return (
//     <div>
//       <ToastContainer/>
//       <Routes>
//        <Route path='/' element={<Home/>}/>
//        <Route path='/login' element={<Login/>}/>
//        <Route path="/email-verify" element={<EmailVerify />} />
//        <Route path='/reset-password' element={<ResetPassword/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import EmailVerify from './pages/EmailVerify';
import axios from "axios";

const App = () => {
  const [authStatus, setAuthStatus] = useState(null); // To store authentication status
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch authentication status on component mount
  useEffect(() => {
    fetch("https://muobot-server.onrender.com/api/auth/is-auth", {
      method: "GET",
      credentials: "include", // Sends cookies (JWT) with the request
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthStatus(data.success); // Set authentication status from response
        setLoading(false); // Set loading to false once we have the response
      })
      .catch(() => {
        setAuthStatus(false); // If there's an error, mark as not authenticated
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  // Show loading message while fetching auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={authStatus ? <Home /> : <Login />} /> {/* Redirect to Login if not authenticated */}
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;

