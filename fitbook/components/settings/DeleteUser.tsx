"use client";
import React, { useState } from "react";

const DeleteUser = () => {
  const [clicked, setClicked] = useState(false);

  const deleteThisUser = () => {
    alert("Your account was sucessfully deleted.");
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
              className="m-5 bg-red-400 object-right text-center rounded text-white p-2 font-bold"
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
