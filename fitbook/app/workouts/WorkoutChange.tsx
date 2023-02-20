"use client";

import { ClassNames } from "@emotion/react";
import Image from "next/image";

type Props = {
  name: String;
  index: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const flex = "flex";
const hidden = "hidden";

function WorkoutChange({ name, open, setOpen, index }: Props) {
  return (
    <div
      className={
        "fixed inset-0 z-50  items-center justify-center w-full bg- bg-opacity-60 bg-primary" +
        (open ? hidden : flex)
      }
    >
      <div className="flex w-3/4 p-4 bg-white border-2 rounded-md shadow-lg h-3/4">
        <p>{name}</p> <button onClick={() => setOpen(false)}>X</button>
      </div>
    </div>
  );
}

export default WorkoutChange;
