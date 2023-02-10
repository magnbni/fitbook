"use client";

import Link from "next/link";
import Logout from "./Logout";

function Header() {
  return (
    <header className="shadow-xl h-14 w-full flex justify-between items-center p-4 bg-primary fixed top-0">
      <Link className="items-center" href={"/"}>
        <p className="drop-shadow-md text-white text-2xl font-black tracking-wider">
          fitbook
        </p>
      </Link>
      <div className="flex justify-between items-center">
        <Link
          href={"/myprofile"}
          className="hover:scale-105 flex bg-white shadow-md items-center p-1 px-1 pr-2 h-10 rounded"
        >
          <img
            className="w-8 h-8 rounded shadow-inner"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          />{" "}
          <p className="text-primary font-black pl-2">Fred Ole</p>
        </Link>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
