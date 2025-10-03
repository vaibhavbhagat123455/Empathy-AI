import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);  // ✅ Correct way to reference a document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User Data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
