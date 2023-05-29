import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './pie-chart.css';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function PieChart() {
  const data = {
    datasets: [
      {
        label: 'Leads',
        data: [12, 2],
        backgroundColor: [
          "#3C1EB5",
          '#0174D8',
        ],
        borderColor: [
          '#3C1EB5',
          '#0174D8',
        ],
        borderWidth: 1,
      },
    ],
    labels: ['B2B', 'B2C'],
  };
  return (
    <>
      <div className="pie-chart">
        <h6>Annually Lead chart</h6>
      </div>
      <div className="chart">

        <Pie data={data} />
      </div>
    </>
  );
}