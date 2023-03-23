"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import SessionChange from "../../components/workouts/Sessions/SessionChange";
import WorkoutChange from "../../components/workouts/Workouts/WorkoutChange";
import WorkoutsPage from "../../components/workouts/WorkoutsPage";

import { db, firebase } from "../../firebase";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { WorkoutApi } from "../../utils/api/WorkoutApi";
import { SessionApi } from "../../utils/api/SessionApi";

const Workouts: NextPage = () => {
  const [open, setOpen] = useState(0);
  const [tab, setTab] = useState(0);

  const [id, setID] = useState("");

  return (
    <>
      <div
        className={` ${
          open != 0
            ? "fixed top-14 flex flex-col w-3/5 h-full"
            : "flex flex-col w-full h-full"
        } `}
      >
        <p className="mb-2 text-2xl">My Workout Page</p>
        <button
          onClick={() => {
            SessionApi.createSession("Endre", "Totoro mage");
          }}
        >
          
        </button>
        <WorkoutsPage
          tab={tab}
          setTab={setTab}
          setOpen={setOpen}
          setID={setID}
        />
      </div>
    </>
  );
};

export default Workouts;
