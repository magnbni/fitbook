"use client";

import { signOut } from "next-auth/react";
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { db, firebase } from "../firebase";
import { deleteDoc } from "firebase/firestore";

function Logout() {
  return (
    <button
      className="hover:scale-105 h-10 p-1 px-4 ml-4 bg-white rounded text-primary font-black shadow-md"
      onClick={() => findUsers().then(response =>  signOut())}
    >
      {" "}
      Log out{" "}
    </button>
  );
}
const findUsers = async () => {
  await deleteDoc(doc(db, "activeUsers", "1"));
}

export default Logout;
