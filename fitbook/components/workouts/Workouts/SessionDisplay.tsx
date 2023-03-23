import { SessionDto } from "../../../types/workouts";

type Props = {
  start: string;
  end: string;
  name: string;
  session: SessionDto;
};

function SessionDisplay({ start, end, name, session }: Props) {
  console.log(session.excersise)
  return (
    <div className="flex flex-col w-full p-2 mb-1 border-2 rounded-sm shadow-sm">
      <div className="flex ">{name}</div>
      <ol>
        {Object.values(session.excersise).map((e, index) => (
          <li className="text-sm" key={index}>
            {e.name} : {e.reps}
          </li>
        ))}
      </ol>

      <div className="flex text-xs">
        {start} - {end}
      </div>
    </div>
  );
}

export default SessionDisplay;
