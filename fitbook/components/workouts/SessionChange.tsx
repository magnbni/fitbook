"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type Props = {
  name: String;
  index: number;
  setOpen: (value: number) => void;
};

function SessionChange({ name, setOpen }: Props) {
  const [week, setWeek] = useState(0);

  const session1 = {
    start: 12,
    end: 14,
    type: "run",
  };

  const session2 = {
    start: 10,
    end: 12,
    type: "fitfatbacky",
  };

  const days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <div className={"fixed inset-0 z-40 w-screen h-screen"}>
        <div
          className={
            "flex items-center  w-full h-full justify-center bg-opacity-60 bg-gray-400"
          }
        >
          <div className="w-2/4 p-1 bg-white border rounded-md shadow-xl h-3/4">
            <div className="flex items-center justify-between w-full p-2 border-b-2 border-primary ">
              <p>{name}</p>

              <div className="p-1 rounded-full hover:bg-opacity-10 hover:bg-primary hover:scale-110">
                <XMarkIcon
                  onClick={() => setOpen(0)}
                  className={"h-5 w-5 cursor-pointer "}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionChange;
