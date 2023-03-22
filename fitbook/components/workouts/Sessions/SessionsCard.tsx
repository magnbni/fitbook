import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { SessionDto } from "../../../types/workouts";
import { SessionApi } from "../../../utils/api/SessionApi";

type Props = {
  id: string;
  sessions: Record<string, SessionDto>;
  img: string;
  setOpen: (value: boolean) => void;
  setID: (value: string) => void;
  deleteSession: (value: string) => void;
};

function SessionsCard({
  id,
  setID,
  img,
  sessions,
  setOpen,
  deleteSession,
}: Props) {
  const handleShareSession = () => {};
  return (
    <div className={` relative `}>
      <div
        onClick={() => {
          setOpen(true);
          setID(id);
        }}
        className="relative flex-wrap w-full border-2"
      >
        <Image src={img} alt={"google"} width={500} height={500} />
      </div>

      <div
        onClick={() => {
          setOpen(true);
          setID(id);
        }}
        className="absolute bottom-0 flex items-center justify-between w-full h-8 px-2 text-left text-white bg-gray-500 bg-opacity-60"
      >
        {sessions[id].name}
        <div
          onClick={handleShareSession}
          className="absolute px-2 text-sm rounded-full cursor-pointer right-2 h-fit bg-primary"
        >
          Share
        </div>
      </div>
      <div
        onClick={() => {
          deleteSession(id);
        }}
        className="absolute z-50 p-2 rounded-full cursor-pointer top-1 right-1 bg-primary"
      >
        <TrashIcon width={20} height={20} color="white" />
      </div>
    </div>
  );
}

export default SessionsCard;
