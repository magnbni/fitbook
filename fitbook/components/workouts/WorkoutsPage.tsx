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
  function Open() {
    setOpen(tab + 1);
  }

  const marked = "w-1/2 p-2 text-center font-bold bg-primary text-white";
  const notMarked =
    "w-1/2 p-2 text-center  font-bold border-primary border-2 text-primary";

  return (
    <>
      <div className="mb-4">
        <ActiveWorkout />
      </div>

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

        {tab === 0 && (
          <WorkoutsTab data={workoutsData} Open={Open} setIndex={setIndex} />
        )}
        {tab === 1 && (
          <SessionsTab data={sessionsData} Open={Open} setIndex={setIndex} />
        )}
      </div>
    </>
  );
}

export default WorkoutsPage;
