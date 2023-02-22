"use client";

import type { NextPage } from "next";
import Feed from "../../components/Feed";
import AddFriend from "../../components/AddFriend";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { signOut } from "next-auth/react";
import { use, useRef, useState } from "react";
import React from "react";

const Profile: NextPage = () => {
  const [imgsrc, setImgsrc] = useState(
    "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
  );
  const [usernamesrc, setUsernamesrc] = useState("");
  const [namesrc, setName] = useState("");

  const generateImage = async () => {
    let docRef = doc(db, "activeUsers", "1");
    let docSnap = await getDoc(docRef);
    const username = docSnap.get("username");
    docRef = doc(db, "users", username);
    docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.exists()) {
      if (docSnap.get("username") != undefined) {
        const pictureInDatabase = docSnap.get("picture");
        setImgsrc(pictureInDatabase);
        console.log(pictureInDatabase);
      }
    } else {
      signOut();
    }
  };

  const username = async () => {
    const docRefActive = doc(db, "activeUsers", "1");

    const docSnapActive = await getDoc(docRefActive);
    const username = docSnapActive.get("username");

    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnapActive.exists() && docSnap.exists()) {
      if (docSnap.get("username") != undefined) {
        const username = docSnap.get("username");
        setUsernamesrc(username);
        setName("@" + username);
      }
    } else {
      signOut();
    }
  };

  generateImage();
  username();

  return (
    <div className="w-full flex flex-col top-14 pl-4">
      <div className="flex flex-row-03 pl-4 pb-4 border-b-4 border-primary border-opacity-50">
        <div className="h-full w-3/12 flex justify float-left">
          {/* Modify to show users image and username */}
          <img
            className="w-50 h-50 rounded-full shadow-inner"
            src={imgsrc}
            id="img"
          />
        </div>
        <div className="flex w-9/12 justify-between items-end">
          <div className="flex flex-col justify-end">
            <p className="text-primary font-black text-xl" id="name">
              {usernamesrc}
            </p>
            <p className="text-black font text">{namesrc}</p>
          </div>
          <AddFriend />
        </div>
      </div>
      <div className="pt-2">
        <Feed /> {/* Customize to only show users posts */}
      </div>
    </div>
  );
};

export default Profile;
