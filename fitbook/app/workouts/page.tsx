"use client";

import type { NextPage } from "next";
import { useState } from "react";
import Workout from "./Workout";
import WorkoutChange from "./WorkoutChange";

const Workouts: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const workouts = [
    { name: "Getting big" },
    { name: "Getting slim" },
    { name: "Getting fast" },
    { name: "Getting bold" },
    { name: "Getting stuck" },
    { name: "Getting thick" },
  ];

  const clip = "clip";
  return (
    <>
      {open ? (
        <WorkoutChange
          open={open}
          setOpen={setOpen}
          name={workouts[index].name}
          index={index}
        />
      ) : (
        <div className="flex flex-col w-full h-full">
          <p className="p-4 text-2xl">My Workout Page</p>
          <div className="flex justify-between">
            <button className="w-6/12 py-2 m-2 border-2">Create Session</button>
            <button className="w-6/12 py-2 m-2 border-2">Create Session</button>
          </div>

          <div>
            <p>Workouts</p>
            <div className="grid w-full grid-cols-2 p-2 border-2">
              {workouts.map((workout, index) => (
                <Workout
                  setOpen={setOpen}
                  setIndex={setIndex}
                  key={index}
                  name={workout.name}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div>
            <p>Sessions</p>
            <div className="grid w-full grid-cols-2 p-2 border-2">
              {workouts.map((workout, index) => (
                <Workout
                  setOpen={setOpen}
                  setIndex={setIndex}
                  key={index}
                  name={workout.name}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Workouts;
