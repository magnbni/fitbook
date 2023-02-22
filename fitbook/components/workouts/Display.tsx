import Image from "next/image";

type Props = {
  name: String;
  index: number;
  img: string;
  Open: () => void;
  setIndex: (value: number) => void;
};

function Display({ img, name, setIndex, Open, index }: Props) {
  return (
    <button
      onClick={() => {
        setIndex(index);
        Open();
      }}
      className="relative flex-wrap w-full border-2"
    >
      <Image src={img} alt={"google"} width={500} height={500} />
      <div className="absolute bottom-0 w-full p-2 text-left text-white bg-gray-500 bg-opacity-60">
        {name} - {index}
      </div>
    </button>
  );
}

export default Display;
