import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, getDoc, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";

export default function Support() {
  const { user } = useAuth(); // Get the authenticated user
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // All users in the database
  const [following, setFollowing] = useState({}); // Tracking follow/unfollow status
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple clicks

  useEffect(() => {
    // Fetch all users from Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, "users"));
        setUsers(usersCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();

    // Fetch current user's following status
    const fetchFollowingStatus = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const followingList = userData.following || [];
          const followingStatus = followingList.reduce((acc, user) => {
            acc[user.uid] = true;
            return acc;
          }, {});
          setFollowing(followingStatus); // Set the following status
        }
      } catch (error) {
        console.error("Error fetching following status:", error);
      }
    };
    fetchFollowingStatus();
  }, [user.uid]); // Re-run whenever user.uid changes

  const toggleFollow = async (otherUserId, otherUser) => {
    if (!user) return; // If no user is logged in, do nothing

    setFollowing((prev) => ({
      ...prev,
      [otherUserId]: !prev[otherUserId], // Toggle follow status
    }));

    setLoading(true); // Set loading state

    try {
      const userRef = doc(db, "users", user.uid);
      const otherUserRef = doc(db, "users", otherUserId);

      // Fetch both user documents
      const otherUserDoc = await getDoc(otherUserRef);
      const userDoc = await getDoc(userRef);

      if (following[otherUserId]) {
        // Unfollow logic
        await updateDoc(userRef, {
          following: arrayRemove({
            uid: otherUserId,
            username: otherUser.username,
            profileImage: otherUser.profileImage,
            email: otherUser.email,
          }),
        });

        await updateDoc(otherUserRef, {
          followers: arrayRemove({
            uid: user.uid,
            username: user.username,
            profileImage: user.profileImage,
            email: user.email,
          }),
        });
      } else {
        // Follow logic
        await updateDoc(userRef, {
          following: arrayUnion({
            uid: otherUserId,
            username: otherUser.username,
            profileImage: otherUser.profileImage,
            email: otherUser.email,
          }),
        });

        await updateDoc(otherUserRef, {
          followers: arrayUnion({
            uid: user.uid,
            username: user.username,
            profileImage: user.profileImage,
            email: user.email,
          }),
        });
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
      setFollowing((prev) => ({
        ...prev,
        [otherUserId]: !prev[otherUserId], // Revert the state if error occurs
      }));
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Chat with Users</h2>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          users.map((otherUser) => (
            otherUser.uid !== user.uid && (
              <div
                key={otherUser.id}
                className="flex items-center gap-4 p-4 border-b hover:bg-blue-100 transition-all rounded-md"
              >
                <img
                  src={otherUser.profileImage || "default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full shadow-md border-2 border-blue-500"
                />
                <p className="font-semibold text-gray-800">{otherUser.username}</p>

                {/* Follow / Unfollow Button */}
                <button
                  onClick={() => toggleFollow(otherUser.id, otherUser)}
                  className={`px-4 py-2 flex items-center gap-2 rounded-lg shadow-md transition ${loading ? "opacity-50 cursor-not-allowed" : ""} ${following[otherUser.id] ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
                  disabled={loading}
                >
                  {following[otherUser.id] ? <IoPersonRemove className="text-lg" /> : <IoPersonAdd className="text-lg" />}
                  {following[otherUser.id] ? "Unfollow" : "Follow"}
                </button>

                {/* Chat Button */}
                <button
                  onClick={() =>
                    navigate(`/chat/${otherUser.uid}/${encodeURIComponent(otherUser.username)}/${encodeURIComponent(otherUser.profileImage || "default-avatar.png")}`)
                  }
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
                >
                  <FiMessageCircle />
                  Chat
                </button>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}
