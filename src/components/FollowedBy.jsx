import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Followers() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!user) return;

      // Get current user's document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const currentUser = userDoc.data();
        const followersIds = currentUser.followers || [];

        if (followersIds.length > 0) {
          // Fetch details of users who are following the current user
          const followersList = await Promise.all(
            followersIds.map(async (id) => {
              const followerDoc = await getDoc(doc(db, "users", id));
              if (followerDoc.exists()) {
                return { id: followerDoc.id, ...followerDoc.data() };
              }
            })
          );

          setFollowers(followersList.filter(Boolean)); // Remove null/undefined entries
        }
      }
    };

    fetchFollowers();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Followers</h2>
      {followers.length === 0 ? (
        <p>No followers yet.</p>
      ) : (
        followers.map((follower) => (
          <div key={follower.id} className="flex items-center gap-4 p-3 border-b">
            <img
              src={follower.profileImage || "/images/default-avatar.png"}
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
            <p className="font-semibold">{follower.username}</p>
          </div>
        ))
      )}
    </div>
  );
}
