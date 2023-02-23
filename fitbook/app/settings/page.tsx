"use client";
import type { NextPage } from "next";
import DeleteUser from "../../components/settings/DeleteUser";
import ChangePassword from "../../components/settings/ChangePassword";
import ToggleSwitch from "../../components/ToggleSwitch";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import ChangeProfilePicture from "../../components/settings/ChangeProfilePicture";

const Settings: NextPage = () => {
  return (
    <div className="flex items-center flex-col justify-center w-full p-3 bg-green-100 my-2 rounded text-black">
      <div className="w-full flex flex-row-01">
        <p className="text-center font-light w-full text-2xl">Settings</p>
      </div>
      <div className="flex flex-row-02 p-5 w-full text-left">
        <p className="font-light">Darkmode:</p>
        <div className="ml-10">
          <ToggleSwitch
            onActivate={() => alert("Activated")}
            onDisable={() => alert("Disabled")}
          />
        </div>
      </div>
      <div className="flex flex-row-03 p-5 w-full text-left">
        <p className="font-light">Show group activity in feed:</p>
        <div className="ml-10">
          <ToggleSwitch
            onActivate={() => alert("Activated")}
            onDisable={() => alert("Disabled")}
            activated={true}
          />
        </div>
      </div>

      <div className="flex flex-row-04 p-5 w-full text-left">
        <p className="font-light">Show friends activity in feed:</p>
        <div className="ml-10">
          <ToggleSwitch
            onActivate={() => alert("Activated")}
            onDisable={() => alert("Disabled")}
            activated={true}
          />
        </div>
      </div>
      <div className="flex flex-row-05 p-5">
        <ChangePassword />
      </div>
      <div className="flex flex-row-05 p-5">
        <ChangeProfilePicture />
      </div>
      <div className="flex flex-row-06 p-5">
        <DeleteUser />
      </div>
    </div>
  );
};

export default Settings;
