import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
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
  scales: {
    y: {
      beginAtZero: true
    },
  //   xAxes: [{
  //     categorySpacing: 1
  // }],
  },
  layout: {
    padding: {
        top: 5,
        left: 15,
        right: 15,
        bottom: 15
    }
}
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const data = {
  labels,
  datasets: [
    {
      label: 'B2B',
      data: [2000, 3458, 8645, 9574, 3948, 4949, 2230, 2000, 3458, 8645, 9574, 3948, 4949,],
      backgroundColor: "#3C1EB5",
      barThickness:'10',
      barPercentage:0.1,
      categorySpacing:2,
      categoryPercentage:5
    },
    {
      label: 'B2C',
      data: [2000, 3458, 8645, 4574, 3748, 4949, 2230, 2000, 3458, 8645, 9574, 3948, 4949,],
      backgroundColor: '#0174D8',
      barThickness:'10',
      barPercentage:0.1,
      categorySpacing:2,
      categoryPercentage:5
    },
  ],
};

export default function GraphChart() {
  return <>
    <div className="graph-chart-content-dropdown">
      <div className="row">
        <div className="col-sm-6"> <h6>Monthly Lead Report</h6></div>
      </div>

      <Bar options={options} data={data} />
    </div>
  </>
}
