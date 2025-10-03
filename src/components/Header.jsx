import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, LogOut, LogIn, UserPlus, LifeBuoy, Circle } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("✅ Logout successful!");
    } catch (error) {
      console.error("❌ Logout failed:", error.message);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-600 py-4 shadow-lg border-b border-indigo-400">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo / Brand using an Icon */}
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <Circle className="w-10 h-10 text-white drop-shadow-lg" /> {/* React Icon as Logo */}
          <span className="text-3xl font-bold tracking-wide text-white drop-shadow-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Emparia
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              
              {/* Chat */}
              <Link to="/chat" className="relative group">
                <MessageCircle className="w-7 h-7 text-white hover:text-gray-200 transition-all duration-200" />
                <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Chat
                </span>
              </Link>

              {/* Support */}
              <Link to="/support" className="relative group">
                <LifeBuoy className="w-7 h-7 text-white hover:text-gray-200 transition-all duration-200" />
                <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Support
                </span>
              </Link>

              {/* User Profile */}
              <Link to="/profile">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <span className="text-white text-lg font-medium">{user.displayName || "User"}</span>
                
              </div>
              </Link>

              {/* Logout */}
              <button onClick={handleLogout} className="relative group">
                <LogOut className="w-7 h-7 text-white hover:text-red-400 transition-all duration-200" />
                <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              
              {/* Login */}
              <Link to="/login" className="relative group">
                <LogIn className="w-7 h-7 text-white hover:text-gray-200 transition-all duration-200" />
                <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Login
                </span>
              </Link>

              {/* Signup */}
              <Link to="/signup" className="relative group">
                <UserPlus className="w-7 h-7 text-white hover:text-gray-200 transition-all duration-200" />
                <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Signup
                </span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
