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
import { WorkoutDto } from "../../../types/workouts";
import { UserApi } from "../../../utils/api/UserApi";
import { WorkoutApi } from "../../../utils/api/WorkoutApi";
import WorkoutCard from "./WorkoutCard";
import WorkoutChange from "./WorkoutChange";

type Props = {
  workouts: WorkoutDto[];
};

function WorkoutsTab({ workouts }: Props) {
  const [open, Open] = useState(false);
  const [index, setIndex] = useState(0);

  const [query, setQuery] = useState("");
  const [queryList, setQueryList] = useState<WorkoutDto[]>(workouts);

  const setOpen = (bool: boolean) => {
    Open(bool);
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

        <button
          onClick={() => setOpen(true)}
          className="p-1 border-2 rounded border-primary text-primary "
        >
          Add New
        </button>
      </div>
      <div>
        <div className="grid w-full gap-4 p-2 md:grid-col-3 sm:grid-cols-2">
          {workoutItems}
        </div>
      </div>

      {open && (
        <WorkoutChange
          setOpen={setOpen}
          workout={workouts[index]}
          index={index}
        />
      )}
    </>
  );
}

export default WorkoutsTab;
