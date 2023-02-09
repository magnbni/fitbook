"use client";

import Logout from "../Logout/Logout";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <p>fitbook</p>
      <div>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
