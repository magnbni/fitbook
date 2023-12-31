import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { SessionDto, WeekDto, WorkoutDto } from "../../../types/workouts";
import { UserApi } from "../../../utils/api/UserApi";
import { WorkoutApi } from "../../../utils/api/WorkoutApi";
import WorkoutCard from "./WorkoutCard";
import WorkoutChange from "./WorkoutChange";

type Props = {
  workouts: WorkoutDto[];
  sessions: Record<string, SessionDto>;
};

function WorkoutsTab({ workouts, sessions }: Props) {
  const [open, Open] = useState(false);
  const [index, setIndex] = useState(0);

  const [query, setQuery] = useState("");
  const [queryList, setQueryList] = useState<WorkoutDto[]>(workouts);

  const setOpen = (bool: boolean) => {
    Open(bool);
  };

  const [newName, setNewName] = useState("");
  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleCreateSession = () => {
    console.log("creating workout");

    WorkoutApi.addWorkout("Endre", newName).then((res) => {
      if (res) {
        const emptyWorkout: WorkoutDto = {
          ownerId: "Endre",
          name: newName,
          img: res[1],
          workoutId: res[0],
          weeks: {},
        };

        emptyWorkout.weeks[res[3]] = {};

        workouts.push(emptyWorkout);

        const results = workouts.filter((workout) => {
          if (query === "") {
            return workout;
          }
          return workout.name.toLowerCase().includes(query.toLowerCase());
        });

        setQueryList(results);
      } else {
        console.log("Failed to create new Workout");
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const results = workouts.filter((workout) => {
      if (event.target.value === "") {
        return workout;
      }
      return workout.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setQueryList(results);
  };

  const workoutItems = queryList.map((workout, index) => {
    return (
      <WorkoutCard
        setOpen={setOpen}
        setIndex={setIndex}
        key={index}
        name={workout.name}
        index={index}
        img={workout.img}
      />
    );
  });

  return (
    <>
      <div className="flex justify-between p-2 m-2 border-b-2 border-primary">
        <fieldset className="flex flex-row">
          <input
            placeholder="Search"
            onChange={handleChange}
            className="px-1 border-2 rounded border-primary "
            type="text"
          />
        </fieldset>
        <div>
          <input
            placeholder="New workout name"
            onChange={handleNewNameChange}
            className="p-2 mx-2 border-2 rounded border-primary "
            type="text"
          />
          <button
            onClick={() => handleCreateSession()}
            className="p-2 border-2 rounded border-primary text-primary "
          >
            Add New
          </button>
        </div>
      </div>
      <div>
        <div
          className={
            `grid w-full gap-4 p-2 md:grid-col-3 sm:grid-cols-2` +
            `${open ? " h-20 , overflow-hidden" : ""}`
          }
        >
          {workoutItems}
        </div>
      </div>

      {open && (
        <WorkoutChange
          setOpen={setOpen}
          workout={workouts[index]}
          sessions={sessions}
          index={index}
        />
      )}
    </>
  );
}

export default WorkoutsTab;
