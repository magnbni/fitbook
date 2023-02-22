import Image from "next/image";
import { useState } from "react";
import SessionDisplay from "./SessionDisplay";

type Props = {};

function ActiveWorkout({}: Props) {
  const [week, setWeek] = useState(0);

  const session1 = {
    start: 12,
    end: 14,
    type: "run",
  };

  const session2 = {
    start: 10,
    end: 12,
    type: "fitfatbacky",
  };

  const days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data = [
    [
      [session1],
      [],
      [session2, session1],
      [session2, session1],
      [session1],
      [session1],
      [],
    ],
    [
      [session1],
      [],
      [
        session2,
        session2,
        session2,
        session2,
        session2,
        session2,
        session2,
        session2,

        session2,

        session2,
      ],
      [],
      [session2],
      [session1],
      [],
    ],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
  ];
  return (
    <div className="w-full p-1 bg-white border rounded-md shadow-md">
      <div className="flex items-center justify-between w-full p-2 border-b-2 border-primary ">
        <p>MY CURRENT WORKOUT: THIS IS NAME</p>

        <p>Week: {week + 1}</p>
      </div>
      <div className="flex w-full h-full">
        <div className="flex flex-col items-center p-2 border-r-2">
          <div>
            {data.map((weekday, index) => (
              <button
                key={index}
                className="flex mb-1 border-b-2"
                onClick={() => setWeek(index)}
              >
                Week {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full min-h-full p-2 overflow-x-scroll ">
          {data[week].map((day, index) => (
            <div
              key={index}
              className="flex flex-col h-full mr-1 rounded-sm shadow-lg "
            >
              <div className="p-1 text-center text-white h-1/12 t-0 w-44 bg-primary">
                {days[index]}
              </div>

              <div className="flex flex-col justify-center p-1 overflow-hidden whitespace-nowrap h-11/12 hover:overflow-auto hover:scrollbar-hide w-44">
                {day.map((session, index) => (
                  <SessionDisplay
                    key={index}
                    start={session.start}
                    end={session.end}
                    type={session.type}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActiveWorkout;
