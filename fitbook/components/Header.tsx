"use client";

import { doc, getDoc } from "firebase/firestore";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { db } from "../firebase";
import Logout from "./Logout";

function Header() {
  const [imgsrc, setImgsrc] = useState(
    "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
  );
  const [usernamesrc, setUsernamesrc] = useState("");

  const generateImage = async () => {
    let docRef = doc(db, "activeUsers", "1");
    let docSnap = await getDoc(docRef);
    const username = docSnap.get("username");
    docRef = doc(db, "users", username);
    docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.exists()) {
      const pictureInDatabase = docSnap.get("picture");
      setImgsrc(pictureInDatabase);
      console.log(pictureInDatabase);
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
      setUsernamesrc(username);
    } else {
      signOut();
    }
  };

  generateImage();
  username();

  return (
    <header className="fixed top-0 z-40 flex items-center justify-between w-full p-4 shadow-xl h-14 bg-primary">
      <Link className="items-center" href={"/"}>
        <p className="text-2xl font-black tracking-wider text-white drop-shadow-md">
          fitbook
        </p>
      </Link>
      <div className="flex items-center justify-between">
        <Link
          href={"/profile"}
          className="flex items-center h-10 p-1 px-1 pr-2 bg-white rounded shadow-md hover:scale-105"
        >
          <img
            src={imgsrc}
            className="w-8 h-8 rounded shadow-inner"
            id="img"
            alt="Rounded avatar"
          />{" "}
          <p className="pl-2 font-black text-primary" id="name">
            {usernamesrc}
          </p>
        </Link>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
