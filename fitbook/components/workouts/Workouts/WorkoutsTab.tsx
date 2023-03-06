import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

type Props = {
  data: Array<Workout>;
  Open: () => void;
  setIndex: (value: number) => void;
};

type Workout = {
  name: String;
  img: string;
};

function WorkoutsTab({ data, setIndex, Open }: Props) {
  const [state, setstate] = useState({
    query: "",
    list: data as Workout[],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const results = data.filter((session) => {
      if (event.target.value === "") return data;

      return session.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setstate({
      query: event.target.value,
      list: results,
    });
  };
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
          onClick={() => Open()}
          className="p-1 border-2 rounded border-primary text-primary "
        >
          Add New
        </button>
      </div>
      <div>
        {!state.list.length ? (
          <div className="flex flex-col justify-center w-full text-4xl text-center h-80">
            No results for your search
          </div>
        ) : (
          <div className="grid w-full gap-4 p-2 md:grid-col-3 sm:grid-cols-2">
            {state.list.map((workout, index) => (
              <WorkoutCard
                Open={Open}
                setIndex={setIndex}
                key={index}
                name={workout.name}
                index={index}
                img={workout.img}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default WorkoutsTab;
