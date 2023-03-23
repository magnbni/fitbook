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
        className="z-30 absolute bottom-0 flex items-center justify-between w-fit h-8 px-2 text-left text-white bg-gray-500 bg-opacity-60"
      >
        {sessions[id].name}
      </div>
      <div
        onClick={() => {
          SessionApi.handleShareSession(sessions[id]);
        }}
        className="absolute z-40 px-2 text-sm rounded-full cursor-pointer bottom-1 right-2 h-fit bg-primary text-white"
      >
        Share
      </div>

      <div
        onClick={() => {
          deleteSession(id);
        }}
        className="absolute z-40 p-2 rounded-full cursor-pointer top-1 right-1 bg-primary"
      >
        <TrashIcon width={20} height={20} color="white" />
      </div>
    </div>
  );
}

export default SessionsCard;
