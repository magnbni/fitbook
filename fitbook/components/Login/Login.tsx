"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div>
      <div>
        <Image
          alt="no image"
          src="/../public/fitbook.png"
          width={400}
          height={400}
        />
        <button onClick={() => signIn("google")}>Sign in here!</button>
      </div>
    </div>
  );
}

export default Login;
