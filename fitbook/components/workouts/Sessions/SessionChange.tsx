"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ExcersiseDto, SessionDto } from "../../../types/workouts";
import { SessionApi } from "../../../utils/api/SessionApi";
import { WorkoutApi } from "../../../utils/api/WorkoutApi";

type Props = {
  setOpen: (value: boolean) => void;
  session: SessionDto;
  sessions: Record<string, SessionDto>;
};

function SessionChange({ session, sessions, setOpen }: Props) {
  const [inputName, setInputName] = useState<string>("");
  const [inputReps, setInputReps] = useState<string>("");
  const [inputSets, setInputSets] = useState<string>("");

  const [excersiseArray, setExcersises] = useState<
    Record<string, ExcersiseDto>
  >(session.excersise);

  const handleAddExcersise = () => {
    console.log("adding", inputName, " to ", session.sessionID);

    setInputName("");
    setInputReps("");
    setInputSets("");

    SessionApi.addExcersise(
      "Endre",
      session.sessionID,
      inputName,
      inputReps,
      inputSets
    ).then((res) => {
      if (res != null) {
        const excersiseArray = {
          ...session.excersise,
          [res]: { name: inputName, reps: inputReps, sets: inputSets },
        };
        session.excersise = excersiseArray;
        setExcersises(excersiseArray);
      }
    });
  };

  const handleDeleteExcersise = () => {};
  return (
    <>
      <div className={"fixed inset-0 z-40 w-screen h-screen "}>
        <div
          className={
            "flex items-center  w-full h-full justify-center bg-opacity-60 bg-gray-400"
          }
        >
          <div className="w-2/4 p-1 bg-white border rounded-md shadow-xl h-3/4">
            <div className="flex items-center justify-between w-full p-2 border-b-2 border-primary ">
              <p>{session.name}</p>

              <div className="p-1 rounded-full hover:bg-opacity-10 hover:bg-primary hover:scale-110">
                <XMarkIcon
                  onClick={() => setOpen(false)}
                  className={"h-5 w-5 cursor-pointer "}
                />
              </div>
            </div>
            <div className="p-1 overflow-scroll border-b-2 border-primary">
              {Object.values(excersiseArray).map((excersise, index) => {
                return (
                  <div key={index} className="p-2 my-2 border-2">
                    {excersise.name} | Reps: {excersise.reps}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col p-1 align-bottom">
              <input
                value={inputName}
                className="p-1 my-1 border-2"
                type="text"
                placeholder="Name"
                onChange={(event) => setInputName(event.target.value)}
              />
              <input
                value={inputReps}
                className="p-1 my-1 border-2"
                type="number"
                placeholder="Reps"
                onChange={(event) => setInputReps(event.target.value)}
              />
              <input
                value={inputSets}
                className="p-1 my-1 border-2"
                type="number"
                placeholder="Sets"
                onChange={(event) => setInputSets(event.target.value)}
              />
              <button
                className="p-2 text-white bg-primary"
                onClick={() => handleAddExcersise()}
              >
                Add excersise
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionChange;
