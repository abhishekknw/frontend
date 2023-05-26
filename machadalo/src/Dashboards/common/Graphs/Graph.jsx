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
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2000, 3458, 8645, 9574, 3948, 4949, 2230,2000, 3458, 8645, 9574, 3948, 4949, ],
      backgroundColor: "#3C1EB5",
    },
    {
      label: 'Dataset 2',
      data: [2000, 3458, 8645, 4574, 3748, 4949, 2230,2000, 3458, 8645, 9574, 3948, 4949, ],
      backgroundColor: '#0174D8',
    },
  ],
};

export default function GraphChart() {
  return <>
    <div className="graph-chart-content-dropdown">
      <div className="row">
        <div className="col-sm-6"> <h6>Monthly Lead Report</h6></div>
        <div className="col-sm-6  graph-dropdown-btn">
          <Dropdown as={ButtonGroup}>
            <Button variant="light">month</Button>

            <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">January</Dropdown.Item>
              <Dropdown.Item href="#/action-3">February,</Dropdown.Item>
              <Dropdown.Item href="#/action-2">March,</Dropdown.Item>
              <Dropdown.Item href="#/action-2"> April</Dropdown.Item>
              <Dropdown.Item href="#/action-2">May</Dropdown.Item>
              <Dropdown.Item href="#/action-2"> June,</Dropdown.Item>
              <Dropdown.Item href="#/action-2">July</Dropdown.Item>
              {/* <Dropdown.Item href="#/action-2">August</Dropdown.Item>
              <Dropdown.Item href="#/action-2">September</Dropdown.Item>
              <Dropdown.Item href="#/action-2">October</Dropdown.Item>
              <Dropdown.Item href="#/action-2">November</Dropdown.Item>
              <Dropdown.Item href="#/action-2"> December</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Bar options={options} data={data} />
    </div>
  </>
}
