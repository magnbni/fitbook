import Image from "next/image";

type Props = {
  name: String;
  index: number;
};

function Session({ name, index }: Props) {
  return (
    <div className="flex-wrap m-2 border-2">
      <Image src={"/google.png"} alt={"google"} width={50} height={50}></Image>
      {name} - {index}
    </div>
  );
}

export default Session;
