import { async } from "@firebase/util";
import { DocumentData, DocumentReference } from "firebase/firestore";
import RenderResult from "next/dist/server/render-result";
import { useCallback, useEffect, useState } from "react";
import { SessionDto, WorkoutDto } from "../../types/workouts";
import { UserApi } from "../../utils/api/UserApi";
import { WorkoutApi } from "../../utils/api/WorkoutApi";
import { SessionApi } from "../../utils/api/SessionApi";
import ActiveWorkout from "./ActiveWorkout";

import SessionsTab from "./Sessions/SessionsTab";
import WorkoutsTab from "./Workouts/WorkoutsTab";

type Props = {
  tab: number;
  setOpen: (value: number) => void;
  setTab: (value: number) => void;
  setID: (value: string) => void;
};

function WorkoutsPage({ setID, setOpen, setTab, tab }: Props) {
  const name = "Endre";
  const [workouts, setWorkouts] = useState<WorkoutDto[]>([]);
  const [sessions, setSessions] = useState<Record<string, SessionDto>>({});

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const workouts = WorkoutApi.getAllWorkouts(name);
    workouts.then((res) => setWorkouts(res));

    const sessions = SessionApi.getAllSessions(name);
    sessions.then((res) => setSessions(res));
  }, []);

  useEffect(() => {
    setCount(count + 1);
    console.log("Workouts state has changed:", workouts, " - ", count);
    if (workouts.length > 0) {
      setLoading(false);
    }
  }, [workouts]);

  useEffect(() => {
    console.log("Sessions state has changed:", sessions);
  }, [sessions]);

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
          (loading ? (
            <p>Loading...</p>
          ) : (
            <WorkoutsTab workouts={workouts} sessions={sessions} />
          ))}

        {tab === 1 && <SessionsTab sessions={sessions} />}
      </div>
    </>
  );
}

export default WorkoutsPage;
