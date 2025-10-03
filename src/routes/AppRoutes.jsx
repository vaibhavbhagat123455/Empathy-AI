import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Signup from "../components/Signup";
import Login from "../components/Login";
import UserChat from "../components/UserChat";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Support from "../components/Support";
import EmpathyAI from "../components/EmpathyAI";
import Following from "../components/FollowingUsers";  // Added Following component import
import Followers from "../components/FollowedBy";  // Added Followers component import
import Feedbacks from "../components/Feedbacks";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* If user is logged in, redirect them to support page from signup/login */}
      <Route path="/signup" element={user ? <Navigate to="/chat" /> : <Signup />} />
      <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
      
      {/* Protected routes */}
      <Route 
        path="/chat/:chatPartnerId/:chatPartnerName/:chatPartnerImage" 
        element={user ? <UserChat /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={user ? <Profile /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/support" 
        element={user ? <Support /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/chat" 
        element={user ? <EmpathyAI /> : <Navigate to="/login" />} 
      />
      {/* New Following and Followers pages */}
      <Route 
        path="/following" 
        element={user ? <Following /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/followers" 
        element={user ? <Followers /> : <Navigate to="/login" />} 
      />

      <Route 
        path="/feedbacks" 
        element={user ? <Feedbacks /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}
