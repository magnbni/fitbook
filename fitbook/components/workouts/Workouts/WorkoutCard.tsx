import Image from "next/image";

type Props = {
  name: String;
  index: number;
  img: string;
  setOpen: (value: boolean) => void;
  setIndex: (value: number) => void;
};

function WorkoutCard({ img, name, setIndex, setOpen, index }: Props) {
  return (
    <button
      onClick={() => {
        setIndex(index);
        setOpen(true);
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

export default WorkoutCard;
