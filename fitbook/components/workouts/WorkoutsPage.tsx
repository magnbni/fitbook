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
  open: number;
  workoutsData: Array<Workout>;
  sessionsData: Array<Session>;
  setOpen: (value: number) => void;
  setIndex: (value: number) => void;
};

function WorkoutsPage({
  sessionsData,
  workoutsData,
  setIndex,
  setOpen,
  open,
}: Props) {
  function handleCreateNew() {
    if (tab == workoutsData) {
      setOpen(1);
    } else if (tab == sessionsData) {
      setOpen(2);
    }
  }

  function Open() {
    if (tab == workoutsData) {
      setOpen(1);
    } else if (tab == sessionsData) {
      setOpen(2);
    }
  }
  const [tab, setTab] = useState(workoutsData);

  return (
    <div className="mb-4">
      <div className="mb-4">
        <ActiveWorkout />
      </div>

      <div className="flex flex-col w-full rounded shadow-lg">
        <div className="flex w-full rounded shadow-md">
          <button
            className={`w-1/2 p-2 text-center rounded-tl ${
              tab == workoutsData
                ? "bg-primary text-white"
                : " border-primary border-2 text-primary"
            } `}
            onClick={() => setTab(workoutsData)}
          >
            Workouts
          </button>
          <button
            className={`w-1/2 p-2 text-center rounded-tr ${
              tab == sessionsData
                ? "bg-primary text-white"
                : "border-primary border-2 text-primary"
            } `}
            onClick={() => setTab(sessionsData)}
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
          {tab.map((workout, index) => (
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
