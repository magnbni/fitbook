"use client";
import { collection, deleteDoc, doc, getDoc, query, where } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";

export type User = {
  userID: string
  name: string;
  userName: string;
  img: string;
};



const Friend = ({ name, userName, img, userID }: User) => {

  const activeUserRef = doc(db, 'activeUsers', "1");
  
  const onClick = async() => {

    const docSnap = await getDoc(activeUserRef);
    await deleteDoc(doc(db,"users",docSnap.get("username"), "friends", userName)).then(()=>{
      alert(`@${userName} is no longer your friend.`);

    }).catch((error)=>{
      alert(error.message);

    })



  };

  return (
    <div className="flex items-center w-full p-3 transition-colors duration-500 ease-in-out bg-green-100 my-2 rounded text-black; hover:bg-green-200 cursor-pointer">
      <img
        className="w-8 h-8 rounded shadow-inner"
        src={img}
        alt="Rounded avatar"
      />{" "}
      <p className="ml-2.5 font-light text-xl">{name}</p>
      <p className="ml-5 font-light text-sm">@{userName}</p>
      <div className="flex justify-end w-full">
        <button
          onClick={onClick}
          className="hover:scale-110 bg-red-100 object-right rounded text-primary font-black shadow-md"
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
      </div>
    </div>
  );
};

export default Friend;
