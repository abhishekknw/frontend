import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';
import './graph.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,

    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2000, 3458, 8645, 9574, 3948, 4949, 2230],
      backgroundColor: "#3C1EB5",
    },
    {
      label: 'Dataset 2',
      data: [2000, 3458, 8645, 4574, 3748, 4949, 2230],
      backgroundColor: '#0174D8',
    },
  ],
};

export default function GraphChart() {
  return <>
    <Bar options={options} data={data} />
  </>
}
