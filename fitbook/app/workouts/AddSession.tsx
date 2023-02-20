type Props = { setAddSessionOpen: (value: boolean) => void };

function Session({ setAddSessionOpen }: Props) {
  function handleSubmit() {
    //do save session
    setAddSessionOpen(false);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black bg-opacity-10 z-60 t-0 l-0">
      <div className="flex flex-col p-4 bg-white rounded w-fit">
        <p className="w-full text-center">New Sessions</p>

        <div className="mb-1">
          <select className="w-20 p-1 m-1">
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
          </select>
          -
          <select className="w-20 p-1 m-1">
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
          </select>
        </div>

        <select className="w-full p-1">
          <option value="session1">Session 1</option>
          <option value="session2">Session 2</option>
          <option value="session1">Session 1</option>
          <option value="session2">Session 2</option>
          <option value="session1">Session 1</option>
          <option value="session2">Session 2</option>
          <option value="session1">Session 1</option>
          <option value="session2">Session 2</option>
          <option value="session1">Session 1</option>
          <option value="session2">Session 2</option>
          <option value="session1">Session 1</option>
          <option value="session2">Session 2</option>
        </select>

        <button
          onClick={() => handleSubmit()}
          className="w-full p-1 mt-4 text-center bg-primary"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Session;
