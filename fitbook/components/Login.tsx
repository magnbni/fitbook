"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div>
      <Image
        alt="no image"
        src="/../public/fitbook.png"
        width={300}
        height={300}
      />
      <button onClick={() => signIn("google")}>Sign in here!</button>
    </div>
  );
}

export default Login;
