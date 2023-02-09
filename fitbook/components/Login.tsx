"use client";

import { signIn } from "next-auth/react";

function Login() {
  return (
    <button onClick={() => signIn("google")}> Sign in to join fitbook! </button>
  );
}

export default Login;
