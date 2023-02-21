"use client";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { db } from "../../firebase";
import Logout from "../Logout";

const DeleteUser = () => {
  const [clicked, setClicked] = useState(false);

  const deleteThisUser = async () => {
    const docRefActive = doc(db, "activeUsers", "1");
    const docSnapActive = await getDoc(docRefActive);
    const username = docSnapActive.get("username");

    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnapActive.exists() && docSnap.exists()) {
      alert("Profile successfully deleted.");
      await deleteDoc(docRef);
      signOut();
    } else {
      alert("An error accoured with deleting this user.");
      signOut();
    }
  };

  return (
    <div>
      {clicked ? (
        <div className="bg-green-50 rounded p-2">
          <p className="text-center font-light">
            Are you sure you want to delete your account?
            <br />
            <br />
            This process cannot be undone.
          </p>
          <div className="flex items-center justify-center">
            <button
              className="m-5 bg-red-400 object-right text-center rounded text-white p-2 font-bold"
              onClick={() => {
                setClicked(!clicked);
              }}
            >
              Cancel
            </button>
            <button
              className="m-5 bg-red-400 w-1/4 object-right text-center rounded text-white p-2 font-bold"
              onClick={deleteThisUser}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-red-400 object-right text-center rounded text-white p-2 font-bold"
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          Delete account
        </button>
      )}
    </div>
  );
};

export default DeleteUser;
