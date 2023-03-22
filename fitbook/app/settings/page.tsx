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
    <div className="flex flex-col items-center justify-center w-full p-3 my-2 text-black bg-green-100 rounded">
      <div className="flex w-full flex-row-01">
        <p className="w-full text-2xl font-light text-center">Settings</p>
      </div>
      <div className="flex w-full p-5 text-left flex-row-02">
        <p className="font-light">Darkmode:</p>
        <div className="ml-10">
          <ToggleSwitch
            onActivate={() => alert("Activated")}
            onDisable={() => alert("Disabled")}
          />
        </div>
      </div>
      <div className="flex w-full p-5 text-left flex-row-03">
        <p className="font-light">Show group activity in feed:</p>
        <div className="ml-10">
          <ToggleSwitch
            onActivate={() => alert("Activated")}
            onDisable={() => alert("Disabled")}
            activated={true}
          />
        </div>
      </div>

      <div className="flex w-full p-5 text-left flex-row-04">
        <p className="font-light">Show friends activity in feed:</p>
        <div className="ml-10">
          <ToggleSwitch
            onActivate={() => alert("Activated")}
            onDisable={() => alert("Disabled")}
            activated={true}
          />
        </div>
      </div>
      <div className="flex p-5 flex-row-05">
        <ChangePassword />
      </div>
      <div className="flex p-5 flex-row-05">
        <ChangeProfilePicture />
      </div>
      <div className="flex p-5 flex-row-06">
        <DeleteUser />
      </div>
    </div>
  );
};

export default Settings;
