"use client";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { db } from "../../firebase";

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
        <div className="p-2 rounded bg-green-50">
          <p className="font-light text-center">
            Are you sure you want to delete your account?
            <br />
            <br />
            This process cannot be undone.
          </p>
          <div className="flex items-center justify-center">
            <button
              className="object-right p-2 m-5 font-bold text-center text-white bg-red-400 rounded"
              onClick={() => {
                setClicked(!clicked);
              }}
            >
              Cancel
            </button>
            <button
              className="object-right w-1/4 p-2 m-5 font-bold text-center text-white bg-red-400 rounded"
              onClick={deleteThisUser}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <button
          className="object-right p-2 font-bold text-center text-white bg-red-400 rounded"
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
