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

let options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Progression',
    },
  },
};

// scewing of time scope to match current month
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const today = new Date();
let currentMonth = today.getMonth() - 5;
let labels: string[] = [];
let dataIndexes: number[] = [];
for (let i=0; i<6; i++) {
  if (currentMonth < 0) currentMonth += 12;
  if (currentMonth > 11) currentMonth -= 12;
  labels.push(months[currentMonth]);
  dataIndexes.push(currentMonth);
  currentMonth++;
}


const handleRegisterWorkout = () => {
  console.log("Open component")
}

let weightData = {
  labels,
  datasets: [
    {
      label: 'Bodyweight (in kg)',
      data: [85, 85, 84, 85, 84, 82],
      borderColor: '#40A798',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
  ],
};

let run100Data = {
  labels,
  datasets: [
    {
      label: '100m Time (in seconds)',
      data: [20.4, 19.5, 19.1, 19.1, 18.6, 18.3],
      borderColor: '#40A798',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

let maxBenchData = {
  labels,
  datasets: [
    {
      label: 'Max benchpress (in kg)',
      data: [85, 87.5, 80, 82.5, 87.5, 100],
      borderColor: '#40A798',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

let caloriesBurntData = {
  labels,
  datasets: [
    {
      label: 'Calories burnt (in kcal)',
      data: [2133, 2349, 2132, 850, 2678, 2067],
      borderColor: '#40A798',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

let data = weightData;

const Progression: NextPage = () => {
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(!open1);
  }

  const handleWeight = () => {
    // filter for weight and close drop-down
    data = weightData;
    setOpen1(false);
  };

  const handle100m = () => {
    data = run100Data;
    setOpen1(false);
  }

  const handleMaxBench = () => {
    data = maxBenchData;
    setOpen1(false);
  }

  const handleCaloriesBurnt = () => {
    data = caloriesBurntData;
    setOpen1(false);
  }
  return (
    // Line Chart
    <div className="text-center w-full">
      <Line options={options} data={data} />
      {/* Buttons */}
      <div className="rounded-md shadow-md">
        {/* Workout Data Filter */}
        <div className="flex flex-col items-center width-1/2 bg-white text-primary p-1 rounded-md border-black">
          <button className="font-bold rounded-md w-full h-full hover:bg-gray-100" onClick={handleRegisterWorkout}>Register Workout</button>
        </div>
        {/* Datafilter */}
        <div className="flex flex-col top-0.5 items-center width-1/2 bg-white text-primary p-1 rounded-md border-black">
          <button className="font-bold rounded-md w-full h-full hover:bg-gray-100" onClick={handleOpen1}>Filter</button>
          {open1 ? (
            <ul className="w-full h-full">
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handleWeight}>Bodyweight</button>
              </li>
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handle100m}>100m time</button>
              </li>
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handleMaxBench}>Max benchpress</button>
              </li>
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handleCaloriesBurnt}>Calories burnt</button>
              </li>
            </ul>
          ) : null}
        </div>
        {/* Time Scope Filter */}
        {/* <div className="flex flex-col top-0.5 items-center width-1/2 bg-white text-primary p-1 rounded-md border-black">
          <button className="font-bold rounded-md w-full h-full hover:bg-gray-100" onClick={handleOpen2}>Time Scope</button>
          {open2 ? (
            <ul className="w-full h-full">
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handle6WeekScope}>6 Weeks</button>
              </li>
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handle3MonthScope}>3 Months</button>
              </li>
              <li className="rounded-md w-full h-full hover:bg-gray-100">
                <button className="w-full h-full" onClick={handle1YearScope}>1 Year</button>
              </li>
            </ul>
          ) : null}
        </div> */}
      </div>
    </div>
  );
};

export default Progression;

// var weightDataSet:number[] = [
//   85, 85, 84, 83, 82, // Jan
//   81, 81, 81, 82, // Feb
//   81, 80, 80, 79,  // Mar
//   79, 78, 79, 80, 79, // Apr
//   80, 79, 79, 79, // May
//   79, 78, 78, 77, // Jun
//   78, 78, 79, 80, 80, // Jul
//   81, 80, 80, 81, // Aug
//   80, 81, 81, 82, // Sep
//   81, 81, 80, 80, // Oct
//   81, 81, 82, 82, // Nov
//   82, 82, 83, 84, 85 // Dec
// ]

// const weekFormat = (ds: number[]) => {
//   return [
//     ds[0],
//     ds[1], 
//     ds[2], 
//     ds[3], 
//     ds[4],
//     ds[5]
//   ]
// };

// const monthFormat = (ds: number[]) => {
//   return [
//     (ds: number[]) => ds.slice(0, 5).reduce((a, b) => a+b) / 5,
//     (ds: number[]) => ds.slice(5, 9).reduce((a, b) => a+b) / 4,
//     (ds: number[]) => ds.slice(9, 13).reduce((a, b) => a+b) / 4,
//     (ds: number[]) => ds.slice(13, 18).reduce((a, b) => a+b) / 5,
//     (ds: number[]) => ds.slice(18, 22).reduce((a, b) => a+b) / 4,
//     (ds: number[]) => ds.slice(22, 26).reduce((a, b) => a+b) / 4
//   ]
// };

// const yearFormat = (ds: number[]) => {
//   return [
//     (ds: number[]) => ds.slice(0, 9).reduce((a, b) => a+b) / 9,
//     (ds: number[]) => ds.slice(9, 18).reduce((a, b) => a+b) / 9,
//     (ds: number[]) => ds.slice(18, 26).reduce((a, b) => a+b) / 8,
//     (ds: number[]) => ds.slice(26, 34).reduce((a, b) => a+b) / 9,
//     (ds: number[]) => ds.slice(34, 42).reduce((a, b) => a+b) / 8,
//     (ds: number[]) => ds.slice(42, 51).reduce((a, b) => a+b) / 9
//   ]
// };

//   // handling of time filtering

//   const handle6WeekScope = () => {
//     labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
//     data.labels = labels;
//     setOpen2(false);
//   }

//   const handle3MonthScope = () => {
//     labels = ['January', 'February', 'March', 'April', 'May', 'June'];
//     data.labels = labels;
//     setOpen2(false);
//   }

//   const handle1YearScope = () => {
//     labels = ['January', 'March', 'May', 'July', 'September', 'November'];
//     data.labels = labels;
//     setOpen2(false);
//   }