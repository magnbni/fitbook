"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { db, firebase } from "../firebase";
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  let usernameValue: String;
  let passwordValue: String;

  const [word, setWord] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen text-white align-middle bg-primary">
        <p className="text-4xl ">Welcome to</p>
        <p className="text-9xl mb-10">fitbook</p>
        <input
          value={name}
          type="text"
          className="text-black mt-6"
          placeholder="Username"
          id="usernameID"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="text-black mb-3 mt-1"
          value={word}
          type="text"
          id="passwordID"
          placeholder="Password"
          onChange={(e) => setWord(e.target.value)}
        ></input>
        <button
          className="flex items-center justify-between px-4 m-1 bg-white border-2"
          data-onsuccess="onSignIn"
          onClick={() => signIn2()}
        >
          <p className="pr-5 font-bold text-primary">Sign in here!</p>
        </button>
        <button
          className="flex items-center justify-between px-4 m-1 bg-white border-2"
          data-onsuccess="onSignIn"
          onClick={() => signUp()}
        >
          <p className="pr-5 font-bold text-primary">Sign up here!</p>
        </button>
      </div>
    </>
  );
}

const signIn2 = async () => {
  let username = (document.getElementById("usernameID") as HTMLInputElement)
    .value;
  let password = (document.getElementById("passwordID") as HTMLInputElement)
    .value;

  const docData = {
    username: username,
    password: password,
  };

  const findUsers = async () => {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let passwordInDatabase = docSnap.get("password");
      console.log(passwordInDatabase);
      if (passwordInDatabase == password) {
        signIn("google");
      } else {
        alert(`Wrong password`);
      }
    } else {
      alert(`No such user`);
    }
  };
  findUsers();
};

const signUp = async () => {
  let username = (document.getElementById("usernameID") as HTMLInputElement)
    .value;
  let password = (document.getElementById("passwordID") as HTMLInputElement)
    .value;

  const docData = {
    username: username,
    password: password,
  };

  const findUsers = async () => {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert(`User exists`);
    } else {
      await setDoc(doc(db, "users", username), docData);
      signIn("google");
    }
  };
  findUsers();
};

export default Login;
