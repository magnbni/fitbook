"use client"
import React, { useState } from 'react';
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { NextPage } from 'next';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Weight',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const weightData = {
  labels,
  datasets: [
    {
      label: 'Progression',
      data: [85, 85, 84, 83, 82, 81],
      borderColor: '#40A798',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const runData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [85, 85, 84, 83, 82, 82, 81],
      borderColor: '#40A798',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const Progression: NextPage = () => {
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(!open1)
  }

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    setOpen2(!open2)
  }

  const handleWeight = () => {
    // do something
    setOpen1(false);
  };
  
  const handleExerciseLength = () => {
    // do something
    setOpen1(false);
  };


  return (
    // Line Chart
    <div className="w-full h-screen text-center">
      <Line options={options} data={weightData} />
      {/* Dropdowns */}
      <div className="top-10">
        {/* Datafilter */}
        <div className="flex flex-col items-center width-1/2 bg-white text-primary p-1 rounded-md">
          <button className="font-bold p-1 rounded-md hover:bg-gray-100" onClick={handleOpen1}>Datatype</button>
          {open1 ? (
            <ul className="">
              <li className="p-1 rounded-md hover:bg-gray-100">
                <button>Weight</button>
              </li>
              <li className="p-1 rounded-md hover:bg-gray-100">
                <button>Runtime</button>
              </li>
            </ul>
          ) : null}
        </div>
        {/* Time Scope Filter */}
        <div className="flex flex-col items-center width-1/2 bg-white text-primary p-1 rounded-md">
          <button className="font-bold p-1 rounded-md hover:bg-gray-100" onClick={handleOpen2}>Time Scope</button>
          {open2 ? (
            <ul className="">
              <li className="p-1 rounded-md hover:bg-gray-100">
                <button>Month</button>
              </li>
              <li className="p-1 rounded-md hover:bg-gray-100">
                <button>6 Months</button>
              </li>
              <li className="p-1 rounded-md hover:bg-gray-100">
                <button>Year</button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Progression;