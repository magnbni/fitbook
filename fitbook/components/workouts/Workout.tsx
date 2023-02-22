import Image from "next/image";

type Props = {
  name: String;
  index: number;
  setOpen: (value: boolean) => void;
  setIndex: (value: number) => void;
};

function Workout({ name, setIndex, setOpen, index }: Props) {
  return (
    <button
      onClick={() => {
        setIndex(index);
        setOpen(true);
      }}
      className="flex-wrap m-2 border-2"
    >
      <Image src={"/google.png"} alt={"google"} width={50} height={50}></Image>
      {name} - {index}
    </button>
  );
}

export default Workout;
