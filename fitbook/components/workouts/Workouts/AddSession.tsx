import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { SessionDto, WorkoutDto } from "../../../types/workouts";
import { WorkoutApi } from "../../../utils/api/WorkoutApi";
import WorkoutChange from "./WorkoutChange";
import TimePicker from "react-time-picker";

type Props = {
  week: string;
  workout: WorkoutDto;
  sessions: Record<string, SessionDto>;
  sessionAddOpen: string;
  setSessionAddOpen: (value: string) => void;
};

function AddSession({
  sessionAddOpen,
  week,
  workout,
  sessions,
  setSessionAddOpen,
}: Props) {
  const [start, setStart] = useState<string>("11:00");
  const [end, setEnd] = useState<string>("10:00");
  const [sessionID, setSessionID] = useState("b9XrLwqKtnENrXDfjT1y");

  function handleSubmit() {
    // add the string to the monday array
    workout.weeks[week][sessionAddOpen] = [
      ...workout.weeks[week][sessionAddOpen],
      { start, end, sessionID },
    ];

    WorkoutApi.addSessionToWorkout(
      "Endre",
      workout.workoutId,
      sessionID,
      week,
      sessionAddOpen,
      start,
      end
    );

    setSessionAddOpen("none");
  }

  return (
    <div className={"fixed inset-0 z-50 w-screen h-screen"}>
      <div
        className={
          "flex items-center  w-full h-full justify-center bg-opacity-60 bg-gray-400"
        }
      >
        <div className="flex flex-col p-4 bg-white rounded w-fit">
          <p className="w-full text-center">New Sessions</p>

          <div className="mb-1">
            <TimePicker
              value={start}
              onChange={(value) => setStart(value as string)}
            />
            -
            <TimePicker
              value={end}
              onChange={(value) => setEnd(value as string)}
            />
          </div>

          <select
            className="w-full p-1"
            onChange={(event) => setSessionID(event.target.value)}
          >
            {Object.keys(sessions).map((key) => (
              <option key={key} value={key}>
                {sessions[key].name}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleSubmit()}
            className="w-full p-1 mt-4 text-center bg-primary"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSession;
