"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import SessionChange from "../../components/workouts/Sessions/SessionChange";
import WorkoutChange from "../../components/workouts/Workouts/WorkoutChange";
import WorkoutsPage from "../../components/workouts/WorkoutsPage";

import { db, firebase } from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  QueryDocumentSnapshot,
  query,
  where,
  getDocs,
  CollectionReference,
  DocumentSnapshot,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { SessionDto, WorkoutDto } from "../../types/workouts";
import { User } from "../../types/user";
import { log } from "console";
import { getServerSession, SessionOptions } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { WorkoutApi } from "../../utils/api/WorkoutApi";

const Workouts: NextPage = () => {
  const [open, setOpen] = useState(0);
  const [tab, setTab] = useState(0);

  const [index, setIndex] = useState(0);

  const [activeUserName, setActiveUserName] = useState();

  const [userRef, setUserRef] = useState<DocumentReference<DocumentData>>();
  const [workoutRef, setWorkoutRef] =
    useState<DocumentReference<DocumentData>>();

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
            WorkoutApi.addWorkout("Endre", "Dette er noe nytt");
          }}
        >
          HELLLOOOOOOOO BUTTON
        </button>
        <WorkoutsPage
          tab={tab}
          setTab={setTab}
          setOpen={setOpen}
          setIndex={setIndex}
        />
      </div>
    </>
  );
};

export default Workouts;
