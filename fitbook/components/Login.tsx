"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="flex flex-col align-middle justify-center items-center w-screen h-screen bg-primary text-white">
      <p className="text-4xl ">Welcome to</p>
      <p className="text-8xl ">fitbook</p>
      <button
        className="p-2 bg-white m-10 border-2 flex justify-between items-center px-4"
        onClick={() => signIn("google")}
      >
        <p className="font-bold text-primary pr-5">Sign in with google here!</p>
        <Image
          src={"/google.png"}
          alt={"google"}
          width={40}
          height={40}
        ></Image>
      </button>
    </div>
  );
}

export default Login;
