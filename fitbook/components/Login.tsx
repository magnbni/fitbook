"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white align-middle bg-primary">
      <p className="text-4xl ">Welcome to</p>
      <p className="text-8xl ">fitbook</p>
      <button
        className="flex items-center justify-between p-2 px-4 m-10 bg-white border-2"
        onClick={() => signIn("google")}
      >
        <p className="pr-5 font-bold text-primary">Sign in with google here!</p>
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
