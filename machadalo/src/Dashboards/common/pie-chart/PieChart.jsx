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

  // const option = {
  //   tooltips: {
  //     callbacks: {
  //       label: function(tooltipItem, data) {
  //         var dataset = data.datasets[tooltipItem.datasetIndex];
  //         var meta = dataset._meta[Object.keys(dataset._meta)[0]];
  //         var total = meta.total;
  //         var currentValue = dataset.data[tooltipItem.index];
  //         var percentage = parseFloat((currentValue/total*100).toFixed(1));
  //         alert(percentage)
  //         return currentValue + ' (' + percentage + '%)';
  //       },
  //       title: function(tooltipItem, data) {
  //         return data.labels[tooltipItem[0].index];
  //       }
  //     }
  //   }
  // }
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

