"use client";

import Link from "next/link";
import Logout from "./Logout";

function Header() {
  return (
    <header className="fixed top-0 z-40 flex items-center justify-between w-full p-4 shadow-xl h-14 bg-primary">
      <Link className="items-center" href={"/"}>
        <p className="text-2xl font-black tracking-wider text-white drop-shadow-md">
          fitbook
        </p>
      </Link>
      <div className="flex items-center justify-between">
        <Link
          href={"/profile"}
          className="flex items-center h-10 p-1 px-1 pr-2 bg-white rounded shadow-md hover:scale-105"
        >
          <img
            className="w-8 h-8 rounded shadow-inner"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          />{" "}
          <p className="pl-2 font-black text-primary">Fred Ole</p>
        </Link>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
