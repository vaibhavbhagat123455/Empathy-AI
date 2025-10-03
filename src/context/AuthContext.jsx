// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        // Check if user exists in Firestore
        const userDocRef = doc(db, "users", authUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.log("⚠️ New user detected, saving to Firestore...");
          // Saving user to Firestore and initializing followers and following as empty arrays
          await setDoc(userDocRef, {
            email: authUser.email,
            username: authUser.displayName || "Anonymous",
            profileImage: authUser.photoURL || "",
            uid: authUser.uid,
            followers: [],  // Initialize empty followers array
            following: []   // Initialize empty following array
          });
          console.log("✅ User saved to Firestore.");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("❌ Google Sign-in failed:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("✅ User logged out!");
    } catch (error) {
      console.error("❌ Logout failed:", error.message);
    }
  };

  const followUser = async (otherUserId, otherUserData) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const otherUserRef = doc(db, "users", otherUserId);

      await updateDoc(userRef, {
        following: arrayUnion({
          uid: otherUserId,
          username: otherUserData.username,
          profileImage: otherUserData.profileImage,
          email: otherUserData.email,
        }),
      });

      await updateDoc(otherUserRef, {
        followers: arrayUnion({
          uid: user.uid,
          username: user.displayName,
          profileImage: user.photoURL,
          email: user.email,
        }),
      });

      console.log("✅ Followed user successfully!");
    } catch (error) {
      console.error("❌ Error following user:", error.message);
    }
  };

  const unfollowUser = async (otherUserId) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const otherUserRef = doc(db, "users", otherUserId);

      await updateDoc(userRef, {
        following: arrayRemove({ uid: otherUserId }),
      });

      await updateDoc(otherUserRef, {
        followers: arrayRemove({ uid: user.uid }),
      });

      console.log("✅ Unfollowed user successfully!");
    } catch (error) {
      console.error("❌ Error unfollowing user:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout, followUser, unfollowUser }}>
      {children}
    </AuthContext.Provider>
  );
}
