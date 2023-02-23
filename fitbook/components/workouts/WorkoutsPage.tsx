import { useState } from "react";
import ActiveWorkout from "./ActiveWorkout";

import Display from "./Display";

type Workout = {
  name: String;
  img: string;
};

type Session = {
  name: String;
  img: string;
};

type Props = {
  tab: number;
  workoutsData: Array<Workout>;
  sessionsData: Array<Session>;
  setOpen: (value: number) => void;
  setTab: (value: number) => void;
  setIndex: (value: number) => void;
};

function WorkoutsPage({
  sessionsData,
  workoutsData,
  setIndex,
  setOpen,
  setTab,
  tab,
}: Props) {
  function handleCreateNew() {
    setOpen(tab + 1);
  }

  const tabs = [workoutsData, sessionsData];

  function Open() {
    setOpen(tab + 1);
  }

  return (
    <div>
      <div className="mb-4">
        <ActiveWorkout />
      </div>

      <div className="flex flex-col w-full rounded shadow-lg">
        <div className="flex w-full rounded shadow-md">
          <button
            className={`w-1/2 p-2 text-center rounded-tl ${
              tab == 0
                ? "bg-primary text-white"
                : " border-primary border-2 text-primary"
            } `}
            onClick={() => setTab(0)}
          >
            Workouts
          </button>
          <button
            className={`w-1/2 p-2 text-center rounded-tr ${
              tab == 1
                ? "bg-primary text-white"
                : "border-primary border-2 text-primary"
            } `}
            onClick={() => setTab(1)}
          >
            Sessions
          </button>
        </div>
        <div className="flex">
          <input className="w-2/4 m-2 border-2 border-black" type="text" />

          <div className="flex w-2/4 m-1">
            <button className="w-2/4 m-1 border-2 border-black">Search</button>

            <button
              onClick={() => Open()}
              className="w-2/4 m-1 border-2 border-black"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="grid w-full gap-4 p-2 md:grid-col-3 sm:grid-cols-2">
          {tabs[tab].map((workout, index) => (
            <Display
              Open={Open}
              setIndex={setIndex}
              key={index}
              name={workout.name}
              index={index}
              img={workout.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkoutsPage;
