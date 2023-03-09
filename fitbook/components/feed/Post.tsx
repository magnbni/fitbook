"use client";

import {
  doc,
  collection,
  addDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { db } from "../../firebase";

function Post() {
  const { data: session } = useSession();
  const findUser = async () => {
    if (session) {
      const docRef = doc(db, "activeUsers", "1");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert(`Database error`);
        signOut();
      } else {
        return docSnap.get("username");
      }
    }
  };

  const postText = async () => {
    const username = await findUser();
    const userDocRef = doc(db, "users", username);
    const docData = {
      postText: text,
      postPicture: picture,
      timestamp: serverTimestamp(),
    };

    const subcollectionRef = collection(userDocRef, "posts");
    addDoc(subcollectionRef, docData)
      .then(() => {
        console.log("Document successfully written!");
        setText("");
        setPicture("");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        alert("An error with posting. Try again");
      });
  };

  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");

  return (
    <div className="flex flex-row w-full px-4 top-14 space-x-2 h-32">
      <div className="w-9/12 h-full">
        <input
          value={text}
          type="text"
          className="text-black w-full border-2 h-4/5 pb-2"
          placeholder="Write your post here"
          id="text"
          onChange={(e) => setText(e.target.value)}
        ></input>
        <input
          value={picture}
          type="picture"
          className="text-black w-full border-2 h-1/5"
          placeholder="Add a picture link here"
          id="picture"
          onChange={(e) => setPicture(e.target.value)}
        ></input>
      </div>

      <button
        className="flex items-center bg-white border-2 w-3/12 h-full text-center"
        onClick={() => postText()}
      >
        <p className="pr-5 font-bold text-primary w-full text-center">Post</p>
      </button>
    </div>
  );
}

export default Post;
