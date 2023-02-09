"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <Image
        alt="no image"
        src="/../public/fitbook.png"
        width={300}
        height={300}
      />
      <button className={styles.signIn} onClick={() => signIn("google")}>
        Sign in here!
      </button>
    </div>
  );
}

export default Login;
