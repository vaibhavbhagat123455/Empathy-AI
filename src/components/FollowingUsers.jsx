import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function FollowingUsers() {
  const { user } = useAuth();
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!user) return;

      // Get current user's document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const currentUser = userDoc.data();
        const followingIds = currentUser.following || [];

        if (followingIds.length > 0) {
          // Fetch details of users the current user is following
          const followingList = await Promise.all(
            followingIds.map(async (id) => {
              const followedUserDoc = await getDoc(doc(db, "users", id));
              if (followedUserDoc.exists()) {
                return { id: followedUserDoc.id, ...followedUserDoc.data() };
              }
            })
          );

          setFollowingUsers(followingList.filter(Boolean)); // Remove null/undefined entries
        }
      }
    };

    fetchFollowing();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Following Users</h2>
      {followingUsers.length === 0 ? (
        <p>You are not following anyone yet.</p>
      ) : (
        followingUsers.map((followedUser) => (
          <div key={followedUser.id} className="flex items-center gap-4 p-3 border-b">
            <img
              src={followedUser.profileImage || "/images/default-avatar.png"}
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
            <p className="font-semibold">{followedUser.username}</p>
          </div>
        ))
      )}
    </div>
  );
}
