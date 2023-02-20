"use client";

import type { NextPage } from "next";
import Feed from "../../components/Feed";
import AddFriend from "../../components/AddFriend";

const Profile: NextPage = () => {
  return (
    <div className="w-full flex flex-col top-14 pl-4">
      <div className="flex flex-row-03 pl-4 pb-4 border-b-4 border-primary border-opacity-50">
        <div className="h-full w-3/12 flex justify float-left">
          {/* Modify to show users image and username */}
          <img
            className="w-50 h-50 rounded-full shadow-inner"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
        </div>
        <div className="flex w-9/12 justify-between items-end">
          <div className="flex flex-col justify-end">
            <p className="text-primary font-black text-xl">Fred Ole</p>
            <p className="text-black font text"> @FredOle</p>
          </div>
          <AddFriend/>
        </div>
      </div>
      <div className="pt-2">
        <Feed /> {/* Customize to only show users posts */}
      </div>
    </div>
  );
};

export default Profile;
