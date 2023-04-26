import React from 'react';
import ApexCharts from 'apexcharts'

export default function GraphChart() {
  var options = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector('#chart'),options)
  console.log(chart,"chart")
  chart.render()
//     let GraphData= {
          
//         series: [{
//           name: 'Net Profit',
//           data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
//         }, {
//           name: 'Revenue',
//           data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
//         }, {
//           name: 'Free Cash Flow',
//           data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
//         }],
//         options: {
//           chart: {
//             type: 'bar',
//             height: 350
//           },
//           plotOptions: {
//             bar: {
//               horizontal: false,
//               columnWidth: '55%',
//               endingShape: 'rounded'
//             },
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent']
//           },
//           xaxis: {
//             categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
//           },
//           yaxis: {
//             title: {
//               text: '$ (thousands)'
//             }
//           },
//           fill: {
//             opacity: 1
//           },
//           tooltip: {
//             y: {
//               formatter: function (val) {
//                 return "$ " + val + " thousands"
//               }
//             }
//           }
//         },
//       };
// var chart = new ApexCharts(document.querySelector("#chart"), GraphData.options, GraphData.series);
// chart.render();
    // return(
    //     <div id="chart">
    //         <ApexCharts options={GraphData.options} series={GraphData.series} type="bar" height={350} />
    //     </div>
    // )
}