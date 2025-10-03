import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FaUserFriends, FaUsers } from "react-icons/fa";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/images/default-avatar.png");
  const [userData, setUserData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          console.log("Fetching user data...");
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("User Data:", data);

            setUserData({ id: user.uid, ...data });
            setFollowers(data.followers || []);
            setFollowing(data.following || []);
            setIsFollowing(data.followers?.includes(user.uid));

            // Update profile image
            if (data.photoURL) {
              setProfileImage(data.photoURL);
            } else if (user.photoURL) {
              setProfileImage(user.photoURL);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleFollowToggle = async () => {
    if (!userData.id || !user.uid) return;

    const userRef = doc(db, "users", userData.id);
    const currentUserRef = doc(db, "users", user.uid);

    if (isFollowing) {
      await updateDoc(userRef, { followers: arrayRemove(user.uid) });
      await updateDoc(currentUserRef, { following: arrayRemove(userData.id) });
      setFollowers((prev) => prev.filter((id) => id !== user.uid));
      setFollowing((prev) => prev.filter((id) => id !== userData.id));
    } else {
      await updateDoc(userRef, { followers: arrayUnion(user.uid) });
      await updateDoc(currentUserRef, { following: arrayUnion(userData.id) });
      setFollowers((prev) => [...prev, user.uid]);
      setFollowing((prev) => [...prev, userData.id]);
    }

    setIsFollowing(!isFollowing);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700 font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-300">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile</h2>

        {/* Profile Picture */}
        <div className="relative inline-block">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover shadow-md"
            onError={(e) => {
              console.error("Error loading profile image:", e);
              e.target.src = "/images/default-avatar.png"; // Fallback image
            }}
          />
        </div>

        {/* User Details */}
        <div className="mt-4">
          <p className="text-lg text-gray-700 font-semibold">{userData.username || "Unknown User"}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        {/* Follow Stats */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-blue-600 font-semibold hover:underline transition-transform hover:scale-105"
          >
            <FaUsers className="text-xl" />
            <span>{followers.length} Followers</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-green-600 font-semibold hover:underline transition-transform hover:scale-105"
          >
            <FaUserFriends className="text-xl" />
            <span>{following.length} Following</span>
          </button>
        </div>

        {/* Follow / Unfollow Button */}
        {userData.id !== user.uid && (
          <button
            onClick={handleFollowToggle}
            className={`mt-4 px-6 py-2 text-white rounded-lg shadow-lg transition-transform hover:scale-105 ${
              isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition-transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
