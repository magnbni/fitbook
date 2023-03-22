import { DocumentData, DocumentReference } from "firebase/firestore";
import { useState } from "react";
import { ExcersiseDto, SessionDto } from "../../../types/workouts";
import { SessionApi } from "../../../utils/api/SessionApi";
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const results: Record<string, SessionDto> = {};

    Object.keys(sessions).forEach((key) => {
      const session = sessions[key];
      if (event.target.value === "") {
        results[key] = session;
      } else if (session.name.toLowerCase().includes(query.toLowerCase())) {
        results[key] = session;
      }
    });

    setQueryList(results);
  };

  const [newName, setNewName] = useState("");
  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleCreateSession = () => {
    console.log("creating session");

    SessionApi.createSession("Endre", newName).then((res) => {
      if (res) {
        const emptySession: SessionDto = {
          sessionID: res[0],
          name: newName,
          img: res[1],
          excersise: {},
        };

        sessions[res[0]] = emptySession;

        const results: Record<string, SessionDto> = {};

        Object.keys(sessions).forEach((key) => {
          const session = sessions[key];
          results[key] = session;
        });

        setQueryList(results);
        setID(res[0]);
        setOpen(true);
      } else {
        console.log("Failed to create new Session");
      }
    });
  };

  return (
    <>
      <div className="flex justify-between p-2 m-2 border-b-2 border-primary">
        <fieldset className="flex flex-row">
          <input
            placeholder="Search"
            onChange={handleSearchChange}
            className="px-1 border-2 rounded border-primary "
            type="text"
          />
        </fieldset>
        <div>
          <input
            placeholder="New session name"
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
            `${open ? " h-60 , overflow-hidden" : ""}`
          }
        >
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
