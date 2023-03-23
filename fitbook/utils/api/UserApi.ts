import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";





export const UserApi = {
  getUserName:  async function ():  Promise<string> {
    const activeDocRef = doc(db, "activeUsers", "1");
    const activeDocSnap = await getDoc(activeDocRef);
    const username = activeDocSnap.get("username");
    return username;
  },


};