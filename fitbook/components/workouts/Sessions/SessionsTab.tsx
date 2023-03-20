import { DocumentData, DocumentReference } from "firebase/firestore";
import { useState } from "react";
import { SessionDto } from "../../../types/workouts";
import SessionChange from "./SessionChange";
import SessionsCard from "./SessionsCard";

type Props = {
  sessions: Record<string, SessionDto>;
};

function SessionsTab({ sessions }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  const [query, setQuery] = useState("");
  const [queryList, setQueryList] =
    useState<Record<string, SessionDto>>(sessions);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const results: Record<string, SessionDto> = {};

    Object.keys(sessions).forEach((key) => {
      const session = sessions[key];
      results[key] = session;
    });

    setQueryList(results);
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
          onClick={() => setOpen(true)}
          className="p-1 border-2 rounded border-primary text-primary "
        >
          Add New
        </button>
      </div>
      <div>
        <div className="grid w-full gap-4 p-2 md:grid-col-3 sm:grid-cols-2">
          {Object.keys(queryList).map((key) => (
            <SessionsCard
              id={key}
              setOpen={setOpen}
              setID={setID}
              key={key}
              name={queryList[key].name}
              img={"/session.jpg"}
            />
          ))}
        </div>
      </div>

      {open && (
        <SessionChange
          setOpen={setOpen}
          session={sessions[id]}
          sessions={sessions}
        />
      )}
    </>
  );
}

export default SessionsTab;