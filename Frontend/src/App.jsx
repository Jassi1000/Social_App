import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreatePost from "./Pages/CreatePost";
import { useEffect } from "react";
import { useAuthStore } from "./Store/auth";
import Loading from "./Components/Loading";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Profile from "./Pages/Profile";
import OtherUserProfile from "./Pages/OtherUserProfile";
import Followers from "./Pages/Followers";
import Followings from "./Pages/Followings";
import EditProfile from "./Pages/EditProfile";
import { GoHomeFill } from "react-icons/go";
import React from "react";


function App() {


  const { checkAuth , loading ,isAuthenticated , logout} = useAuthStore();
  const navigate = useNavigate();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();

  }, [checkAuth]);


  //Function to handle

  // Logout handler
  const logoutHandler = async () => {
    await logout();
    console.log("User logged out");
    navigate("/login");
  };


  // If loading, show a loading spinner
  if(loading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background SVG */}
      {/* <img
        src="./assets/dashboard_background.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      /> */}
        <Loading />
      </div>
    );
  }


  return (
    // flex items-center justify-between w-screen h-screen 
    <div className="relative min-h-screen flex items-center justify-end px-4">
      {/* Background SVG */}
      {/* <img
        src="./assets/dashboard_background.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      /> */}
    {
      isAuthenticated ? (
      <div className="flex items-center justify-between w-[200px] h-screen fixed top-0 left-0">
        {/* This is the Navbar */}
        <div className="flex flex-col items-center justify-center ml-10 space-y-4 ">
            <NavLink to="/dashboard" className=" px-2 py-2 rounded flex items-center space-x-4">
            <GoHomeFill fontSize={"1.8rem"}/>
            <p className="text-lg">Home</p>
            </NavLink>
            <NavLink to="/CreatePost" className="bg-[#002233] text-white px-4 py-2 rounded">
            <GoHomeFill fontSize={"1.8rem"}/>
            <p className="text-lg">Create</p>
            </NavLink>
            <NavLink to="/Profile" className="bg-[#002233] text-white px-4 py-2 rounded">
            <GoHomeFill fontSize={"1.8rem"}/>
            <p className="text-lg">Profile</p>
            </NavLink>
            <button onClick={logoutHandler} className="bg-[#002233] text-white px-4 py-2 rounded">Logout</button>
        </div>
    </div>
      ):
      (<div>
      </div>)
    }
      <Routes>
        <Route path="/" element={isAuthenticated ? (<Dashboard/>) : (<Login />)} />
        <Route path="/signup" element={isAuthenticated ? (<Dashboard/>) : (<Signup />)} />
        <Route path="/dashboard" element={isAuthenticated ? (<Dashboard/>) : (<Login />)} />
        <Route path="/login" element={isAuthenticated ? (<Dashboard/>) : (<Login />)} />
        <Route path="/profile" element={isAuthenticated ? (<Profile/>) : (<Login />)} />
        <Route path="/CreatePost" element={isAuthenticated ? (<CreatePost/>) : (<Login />)} />
        <Route path="/OtherUserProfile" element={isAuthenticated ? (<OtherUserProfile/>) : (<Login />)} />
        <Route path="/Followers" element={isAuthenticated ? (<Followers/>) : (<Login />)} />
        <Route path="/Followings" element={isAuthenticated ? (<Followings/>) : (<Login />)} />
        <Route path="/EditProfile" element={isAuthenticated ? (<EditProfile/>) : (<Login />)} />  
      </Routes>
    </div>
  );
}

export default App;
