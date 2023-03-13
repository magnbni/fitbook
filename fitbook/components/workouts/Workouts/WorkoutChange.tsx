"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { SessionDto, WorkoutDto } from "../../../types/workouts";
import AddSession from "./AddSession";
import SessionDisplay from "./SessionDisplay";

type Props = {
  workout: WorkoutDto;
  index: number;
  setOpen: (value: boolean) => void;
};

function WorkoutChange({ workout, setOpen }: Props) {
  const [sessionAddOpen, setSessionAddOpen] = useState(false);
  const [week, setWeek] = useState(0);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayItems = days.map((day, index) => {
    return (
      <div
        key={index}
        className="flex flex-col h-full mr-1 rounded-sm shadow-lg "
      >
        <div className="p-1 text-center text-white h-1/12 t-0 w-44 bg-primary">
          {day}
        </div>

        <div className="flex flex-col justify-center p-1 overflow-hidden whitespace-nowrap h-11/12 hover:overflow-auto hover:scrollbar-hide w-44">
          {(workout.weeks[week][day.toLowerCase()] as SessionDto[]).map(
            (session, index) => (
              <SessionDisplay
                key={index}
                start={session.start}
                end={session.end}
                name={session.name}
              />
            )
          )}
          <button
            onClick={() => setSessionAddOpen(true)}
            className="px-2 text-xl text-center border-2 rounded-lg border-primary text-primary hover:text-white hover:bg-primary"
          >
            +
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      {sessionAddOpen && <AddSession setSessionAddOpen={setSessionAddOpen} />}

      <div className={"fixed inset-0 z-40 w-screen h-screen"}>
        <div
          className={
            "flex items-center  w-full h-full justify-center bg-opacity-60 bg-gray-400"
          }
        >
          <div className="w-3/4 p-1 bg-white border rounded-md shadow-xl h-3/4">
            <div className="flex items-center justify-between w-full p-2 border-b-2 border-primary ">
              <p>{workout.name}</p>

              <p>Week: {week + 1}</p>

              <div className="p-1 rounded-full hover:bg-opacity-10 hover:bg-primary hover:scale-110">
                <XMarkIcon
                  onClick={() => setOpen(false)}
                  className={"h-5 w-5 cursor-pointer "}
                />
              </div>
            </div>
            <div className="flex w-full h-5/6">
              <div className="flex flex-col items-center p-2 border-r-2">
                <div>
                  {workout.weeks.map((weekday, index) => (
                    <button
                      key={index}
                      className="flex mb-1 border-b-2"
                      onClick={() => setWeek(index)}
                    >
                      Week {index + 1}
                    </button>
                  ))}
                </div>
                <button className="flex items-center justify-center w-10 h-5 border-2 rounded text-primary border-primary">
                  +
                </button>
              </div>
              <div className="flex w-full h-full p-2 overflow-x-scroll ">
                {dayItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkoutChange;
