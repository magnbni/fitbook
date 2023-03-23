"use client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "next-auth/react";
import React, { useState, useRef } from "react";
import { db } from "../../firebase";
import { UserApi } from "../../utils/api/UserApi";

const ChangePassword = () => {
  const [clicked, setClicked] = useState(false);

  const changePassword = async () => {
    setClicked(!clicked);
    let password = inputRef.current.value;
    const docData = { password: password };
    const username = await UserApi.getUserName();
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      alert("Password changed.");
      await updateDoc(docRef, { password: password });
    } else {
      signOut();
    }
  };

  const inputRef = useRef(document.createElement("input"));

  return (
    <div className="w-full">
      {clicked ? (
        <div className="bg-green-50 rounded p-2">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setClicked(!clicked);
              }}
              className="bg-red-100 ml-3 object-right rounded text-primary font-black"
            >
              <svg
                style={{ color: "red" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  fill="red"
                ></path>{" "}
              </svg>
            </button>
            <input
              className="bg-green-50 w-full ml-3 hover: cursor-pointer outline-none"
              type="text"
              name="name"
              placeholder="fill in new password..."
              ref={inputRef}
            />
            <button
              className="m-5 bg-blue-400 object-right text-center rounded text-white p-2 font-bold"
              onClick={changePassword}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-400 object-right text-center rounded text-white p-2 font-bold w-80"
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          Change password
        </button>
      )}
    </div>
  );
};

export default ChangePassword;
