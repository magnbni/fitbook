"use client";

import { UserPlusIcon } from "@heroicons/react/24/solid";

function AddFriend() {
  return (
    <div>
      {true ? (
        <div> {/* If your own profile, false, else "add friend" */}</div>
      ) : (
        <button className="flex bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded">
          <UserPlusIcon className="h-5 w-5 m-1"></UserPlusIcon>
          <span>Add friend</span>
        </button>
      )}
    </div>
  );
}
export default AddFriend;
