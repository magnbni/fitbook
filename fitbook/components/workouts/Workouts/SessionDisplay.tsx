type Props = {
  start: string;
  end: string;
  name: string;
};

function SessionDisplay({ start, end, name }: Props) {
  return (
    <div className="flex flex-col w-full p-2 mb-1 border-2 rounded-sm shadow-sm">
      <p>
        {start} - {end} : {name}
      </p>
    </div>
  );
}

export default SessionDisplay;
