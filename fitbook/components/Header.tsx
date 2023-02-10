"use client";

import Link from "next/link";
import Logout from "./Logout";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-primary">
      <Link className="items-center" href={"/"}>
        <p className="drop-shadow-md text-white text-4xl font-black tracking-wider">
          fitbook
        </p>
      </Link>
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <img
            className="w-10 h-10 rounded-full shadow-md"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          />
        </Link>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
