import Image from "next/image";

type Props = {
  id: string;
  name: string;
  img: string;
  setOpen: (value: boolean) => void;
  setID: (value: string) => void;
};

function SessionsCard({ id, setID, img, name, setOpen }: Props) {
  return (
    <button
      onClick={() => {
        setOpen(true);
        setID(id);
      }}
      className="relative flex-wrap w-full border-2"
    >
      <Image src={img} alt={"google"} width={500} height={500} />
      <div className="absolute bottom-0 w-full p-2 text-left text-white bg-gray-500 bg-opacity-60">
        {name}
      </div>
    </button>
  );
}

export default SessionsCard;
