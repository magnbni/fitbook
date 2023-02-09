"use client";

import { signOut } from "next-auth/react";

function Logout() {
  return <button onClick={() => signOut()}> Log out </button>;
}

export default Logout;
