"use client";
import React, { useRef } from "react";

const SearchFriend = () => {
  const inputRef = useRef(document.createElement("input"));

  const onClick = () => {
    inputRef.current.value
      ? alert(`@${inputRef.current.value} is now added to your friendlist.`)
      : alert("Please fill in a name first.");
  };

  return (
    <div className="flex items-center p-3 transition-colors duration-500 ease-in-out bg-green-50 my-2 rounded text-black">
      <input
        className="bg-green-50 w-full hover: cursor-pointer outline-none"
        type="text"
        name="name"
        placeholder="fill in username..."
        ref={inputRef}
      />
      <button
        onClick={onClick}
        className="bg-white object-right w-36 rounded text-primary p-2 font-black shadow-md"
      >
        Add friend
      </button>
    </div>
  );
};

export default SearchFriend;
