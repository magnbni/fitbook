"use client";

import { signOut } from "next-auth/react";

function Logout() {
  return (
    <button
      className=" drop-shadow-md h-10 p-1 pl-2 pr-2 ml-4 bg-white rounded-sm text-primary font-black shadow-md"
      onClick={() => signOut()}
    >
      {" "}
      Log out{" "}
    </button>
  );
}

export default Logout;
