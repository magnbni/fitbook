"use client";

import type { NextPage } from "next";
import Feed from "../../components/Feed";
import AddFriend from "../../components/AddFriend";

const Profile: NextPage = () => {
  return (
    <div className="flex flex-col w-full pl-4 mt-4 top-14">
      <div className="flex pb-4 pl-4 border-b-4 border-opacity-50 flex-row-03 border-primary">
        <div className="flex float-left w-3/12 h-full justify">
          {/* Modify to show users image and username */}
          <img
            className="rounded-full shadow-inner w-50 h-50"
            src="/bola.jpeg"
          />
        </div>
        <div className="flex items-end justify-between w-9/12">
          <div className="flex flex-col justify-end">
            <p className="text-xl font-black text-primary">Lars Magne</p>
            <p className="text-black font text"> @LarsMagne</p>
          </div>
          <AddFriend />
        </div>
      </div>
      <div className="pt-2">
        <Feed /> {/* Customize to only show users posts */}
      </div>
    </div>
  );
};

export default Profile;
