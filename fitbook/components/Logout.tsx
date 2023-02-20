"use client";

import { signOut } from "next-auth/react";

function Logout() {
  return (
    <button
      className="hover:scale-105 h-10 p-1 px-4 ml-4 bg-white rounded text-primary font-black shadow-md"
      onClick={() => signOut()}
    >
      {" "}
      Log out{" "}
    </button>
  );
}

export default Logout;
