import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchFilteredUsers = async (age) => {
  try {
    const usersRef = collection(db, "users");  // ✅ Correct: `collection()` gets all users
    const q = query(usersRef, where("age", ">", age));  // ✅ Correct: `query()` works on collections
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Users older than ${age}:`, users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
