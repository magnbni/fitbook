"use client";

import type { NextPage } from "next";
import { useState } from "react";
import SessionChange from "../../components/workouts/SessionChange";
import WorkoutChange from "../../components/workouts/WorkoutChange";
import WorkoutsPage from "../../components/workouts/WorkoutsPage";

const Workouts: NextPage = () => {
  const [open, setOpen] = useState(0);

  const [index, setIndex] = useState(0);

  const workouts_data = [
    { name: "Getting big", img: "/workout.jpg" },
    { name: "Getting slim", img: "/workout.jpg" },
    { name: "Getting fast", img: "/workout.jpg" },
    { name: "Getting bold", img: "/workout.jpg" },
    { name: "Getting stuck", img: "/workout.jpg" },
    { name: "Getting thick", img: "/workout.jpg" },
  ];

  const sessions_data = [
    { name: "Running", img: "/session.jpg" },
    { name: "Jumping", img: "/session.jpg" },
    { name: "falling", img: "/session.jpg" },
    { name: "Body", img: "/session.jpg" },
    { name: "Butt", img: "/session.jpg" },
    { name: "Legs", img: "/session.jpg" },
  ];
  return (
    <div
      className={` ${
        open != 0
          ? "fixed top-14 flex flex-col w-3/5 h-full"
          : "flex flex-col w-full h-full"
      } `}
    >
      <p className="p-4 text-2xl">My Workout Page</p>
      <WorkoutsPage
        open={open}
        workoutsData={workouts_data}
        sessionsData={sessions_data}
        setOpen={setOpen}
        setIndex={setIndex}
      />

      {(() => {
        switch (open) {
          case 1:
            return (
              <WorkoutChange
                setOpen={setOpen}
                name={workouts_data[index].name}
                index={index}
              />
            );
          case 2:
            return (
              <SessionChange
                setOpen={setOpen}
                name={sessions_data[index].name}
                index={index}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Workouts;
