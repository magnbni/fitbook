"use client";

import type { NextPage } from "next";
import AddFriend from "../../components/AddFriend";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { signOut } from "next-auth/react";
import { useState } from "react";
import React from "react";
import UserFeed from "../../components/feed/UserFeed";

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
      const pictureInDatabase = docSnap.get("picture");
      setImgsrc(pictureInDatabase);
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
      const username = docSnap.get("username");
      setUsernamesrc(String(username).toUpperCase());
      setName("@" + username);
    } else {
      signOut();
    }
  };

  generateImage();
  username();

  return (
    <div className="flex flex-col w-full pl-4 top-14">
      <div className="flex pb-4 pl-4 border-b-4 border-opacity-50 flex-row-03 border-primary">
        <div className="flex float-left w-3/12 h-full justify">
          <img
            className="rounded-full shadow-inner w-50 h-50"
            src={imgsrc}
            id="img"
          />
        </div>
        <div className="flex items-end justify-between w-9/12">
          <div className="flex flex-col justify-end">
            <p className="text-xl font-black text-primary" id="name">
              {usernamesrc}
            </p>
            <p className="text-black font text">{namesrc}</p>
          </div>
          <AddFriend />
        </div>
      </div>
      <div className="pt-2">
        <UserFeed /> {/* Customize to only show users posts */}
      </div>
    </div>
  );
};

export default Profile;
