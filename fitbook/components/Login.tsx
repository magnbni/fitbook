"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { db, firebase } from "../firebase";
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { useState } from "react";


function Login() {

  let usernameValue: String;
  let passwordValue: String;

  const [word, setWord] = useState("");
  const [name, setName] = useState("");

  return (
    <>
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white align-middle bg-primary">
      <p className="text-4xl ">Welcome to</p>
      <p className="text-8xl ">fitbook</p>
      <label>Brukernavn</label><input value={name} type="text" className="text-black" placeholder="Username" id="usernameID" onChange={
        (e) => setName(e.target.value)
      }></input>
      <label>Passord</label><input className="text-black" value={word} type="text"  id="passwordID" placeholder="Password" onChange={(e) => setWord(e.target.value)}></input>
      <button type="submit"
        onClick={() => register()}
        >Regsitrer</button>
      <button
        className="flex items-center justify-between p-2 px-4 m-10 bg-white border-2"
        onClick={() => signIn("google")}
      >
        <p id="test" className="pr-5 font-bold text-primary">Sign in with google here!</p>
        <Image
          src={"/google.png"}
          alt={"google"}
          width={40}
          height={40}
        ></Image>
      </button>
    </div>
    </>
  );
}

const register = async () => {
  let username = (document.getElementById("usernameID") as HTMLInputElement).value;
  let password = (document.getElementById("passwordID") as HTMLInputElement).value;
  
  const docData = {
    username: username,
    password: password
    };

  
await setDoc(doc(db, "users", "1"), docData);
}

export default Login;
