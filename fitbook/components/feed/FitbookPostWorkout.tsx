import { Timestamp } from "firebase/firestore";
import React from "react";
import "./FitbookPost.css"; // Importerer stilen for komponenten
import { Exercise } from "./MainFeed";

type Props = {
  username: string;
  profilepic: string;
  name: string;
  exercises: Exercise[];
};

const FitbookPost = ({ username, profilepic, name, exercises }: Props) => {
  return (
    <div className="fitbook-post">
      <div className="post-header">
        <div className="avatar">
          <img src={profilepic} alt="Profile picture" />
        </div>

        <div className="imgSettings">
          <h2 className="username">{username}</h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="curreColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-12 h-15"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
      <div className="exercise-table w-full">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Exercise Name</th>
              <th className="px-4 py-2">Sets</th>
              <th className="px-4 py-2">Reps</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center">{exercise.name}</td>
                <td className="border px-4 py-2 text-center">{exercise.sets}</td>
                <td className="border px-4 py-2 text-center">{exercise.reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="post-text">
        <div className="likeComment">
          <svg
            id="heart"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#40A798"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#40A798"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </div>
        <hr />
        <p>
          <b>{username}</b> {name}
        </p>
      </div>
    </div>
  );
};

export default FitbookPost;
