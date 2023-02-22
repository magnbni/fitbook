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
    if (
      docSnap.exists() &&
      docSnap.exists() &&
      docSnap.get("picture") != undefined
    ) {
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

    if (
      docSnapActive.exists() &&
      docSnap.exists() &&
      docSnap.get("username") != undefined
    ) {
      const username = docSnap.get("username");
      setUsernamesrc(username);
    } else {
      signOut();
    }
  };

  generateImage();
  username();

  return (
    <header className="shadow-xl h-14 w-full flex justify-between items-center p-4 bg-primary fixed top-0">
      <Link className="items-center" href={"/"}>
        <p className="drop-shadow-md text-white text-2xl font-black tracking-wider">
          fitbook
        </p>
      </Link>
      <div className="flex justify-between items-center">
        <Link
          href={"/profile"}
          className="hover:scale-105 flex bg-white shadow-md items-center p-1 px-1 pr-2 h-10 rounded"
        >
          <img
            src={imgsrc}
            className="w-8 h-8 rounded shadow-inner"
            id="img"
            alt="Rounded avatar"
          />{" "}
          <p className="text-primary font-black pl-2" id="name">
            {usernamesrc}
          </p>
        </Link>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
