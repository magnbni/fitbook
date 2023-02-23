import WorkoutChange from "./WorkoutChange";

type Props = { setSessionAddOpen: (value: boolean) => void };

function AddSession({ setSessionAddOpen }: Props) {
  function handleSubmit() {
    //do save session
    setSessionAddOpen(false);
  }

  return (
    <div className={"fixed inset-0 z-50 w-screen h-screen"}>
      <div
        className={
          "flex items-center  w-full h-full justify-center bg-opacity-60 bg-gray-400"
        }
      >
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
    </div>
  );
}

export default AddSession;
