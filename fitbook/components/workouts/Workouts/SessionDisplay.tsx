type Props = {
  start: number;
  end: number;
  type: String;
};

function SessionDisplay({ start, end, type }: Props) {
  return (
    <div className="flex flex-col w-full p-2 mb-1 border-2 rounded-sm shadow-sm">
      <p>
        {start} - {end} : {type}
      </p>
    </div>
  );
}

export default SessionDisplay;
