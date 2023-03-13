import { async } from "@firebase/util";
import { DocumentData, DocumentReference } from "firebase/firestore";
import RenderResult from "next/dist/server/render-result";
import { useCallback, useEffect, useState } from "react";
import { SessionDto, WorkoutDto } from "../../types/workouts";
import { UserApi } from "../../utils/api/UserApi";
import { WorkoutApi } from "../../utils/api/WorkoutApi";
import ActiveWorkout from "./ActiveWorkout";

import SessionsTab from "./Sessions/SessionsTab";
import WorkoutsTab from "./Workouts/WorkoutsTab";

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
  setOpen: (value: number) => void;
  setTab: (value: number) => void;
  setIndex: (value: number) => void;
};

function WorkoutsPage({ setIndex, setOpen, setTab, tab }: Props) {
  function Open() {
    setOpen(tab + 1);
  }
  const name = "Endre";
  const [workouts, setWorkouts] = useState<WorkoutDto[]>([]);
  const [sessions, setSessions] = useState<SessionDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const workouts = WorkoutApi.getAllWorkouts(name);
    workouts.then((res) => setWorkouts(res));

    const sessions = WorkoutApi.getAllSessions(name);
    sessions.then((res) => setSessions(res));
  }, []);

  useEffect(() => {
    setCount(count + 1);
    console.log("Workouts state has changed:", workouts, " - ", count);
    if (workouts.length > 0) {
      setLoading(false);
    }
  }, [workouts]);

  const marked = "w-1/2 p-2 text-center font-bold bg-primary text-white";
  const notMarked =
    "w-1/2 p-2 text-center  font-bold border-primary border-2 text-primary";

  return (
    <>
      <div className="mb-4">Active Workout</div>
      <div className="flex flex-col w-full rounded shadow-lg">
        <div className="flex w-full rounded shadow-md">
          <button
            className={`${tab == 0 ? marked : notMarked} `}
            onClick={() => setTab(0)}
          >
            Workouts
          </button>
          <button
            className={` ${tab == 1 ? marked : notMarked} `}
            onClick={() => setTab(1)}
          >
            Sessions
          </button>
        </div>
        {tab === 0 &&
          (loading ? <p>Loading...</p> : <WorkoutsTab workouts={workouts} />)}

        {tab === 1 && (
          <SessionsTab data={sessions} Open={Open} setIndex={setIndex} />
        )}
      </div>
    </>
  );
}

export default WorkoutsPage;
