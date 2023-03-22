"use client";

import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import { SessionDto, WeekDto, WorkoutDto } from "../../../types/workouts";
import { WorkoutApi } from "../../../utils/api/WorkoutApi";
import SessionsCard from "../Sessions/SessionsCard";
import AddSession from "./AddSession";
import SessionDisplay from "./SessionDisplay";

type Props = {
  workout: WorkoutDto;
  sessions: Record<string, SessionDto>;
  index: number;
  setOpen: (value: boolean) => void;
};

function WorkoutChange({ workout, sessions, setOpen }: Props) {
  const [sessionAddOpen, setSessionAddOpen] = useState("none");
  const [week, setWeek] = useState(Object.keys(workout.weeks)[0]);
  const [weeks, setWeeks] = useState(workout.weeks);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDeleteWeek = (key: string) => {
    WorkoutApi.deleteWeek(workout.ownerId, workout.workoutId, key);
    delete workout.weeks[key];
    setWeek(Object.keys(workout.weeks)[0]);
  };

  const addWeek = () => {
    const emptyWeek: WeekDto = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    WorkoutApi.addWeek(workout.ownerId, workout.workoutId).then((res) => {
      if (res != null) {
        workout.weeks = { ...workout.weeks, [res]: emptyWeek };
        setWeek(res);
      }
    });
  };

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
          {Object.values(workout.weeks[week][day.toLowerCase()]).map(
            (session, index) => {
              console.log(session);
              console.log(session.sessionID);
              return (
                <SessionDisplay
                  key={index}
                  start={session.start}
                  end={session.end}
                  name={sessions[session.sessionID].name}
                  session={sessions[session.sessionID]}
                />
              );
            }
          )}
          <button
            onClick={() => setSessionAddOpen(day.toLowerCase())}
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
      {sessionAddOpen != "none" && (
        <AddSession
          week={week}
          workout={workout}
          sessions={sessions}
          sessionAddOpen={sessionAddOpen}
          setSessionAddOpen={setSessionAddOpen}
        />
      )}

      <div className={"fixed inset-0 z-40 w-screen h-screen"}>
        <div
          className={
            "flex items-center  w-full h-full justify-center bg-opacity-60 bg-gray-400"
          }
        >
          <div className="w-3/4 p-1 bg-white border rounded-md shadow-xl h-3/4">
            <div className="flex items-center justify-between w-full p-2 border-b-2 border-primary ">
              <p>{workout.name}</p>

              <p>Week </p>

              <div className="p-1 rounded-full hover:bg-opacity-10 hover:bg-primary hover:scale-110">
                <XMarkIcon
                  onClick={() => setOpen(false)}
                  className={"h-5 w-5 cursor-pointer "}
                />
              </div>
            </div>
            <div className="flex w-full h-5/6">
              <div className="flex flex-col pr-2 overflow-y-scroll border-r-2 min-w-fit overflow-x-clip">
                {Object.keys(workout.weeks).map((key, index) => (
                  <div
                    key={key}
                    className={`flex m-1 border-gray border-2 p-1 rounded  w-full ${
                      key == week ? "border-primary " : ""
                    } `}
                  >
                    <button key={key} onClick={() => setWeek(key)}>
                      Week {index + 1}
                    </button>
                    {key == week && (
                      <TrashIcon
                        onClick={() => handleDeleteWeek(key)}
                        className={"h-5 w-5 cursor-pointer "}
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addWeek()}
                  className="w-full h-10 p-1 m-1 text-2xl text-center text-white rounded bg-primary"
                >
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
