import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");  // ✅ Use `collection()` to reference the collection
    const querySnapshot = await getDocs(usersRef);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    console.log("All Users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
