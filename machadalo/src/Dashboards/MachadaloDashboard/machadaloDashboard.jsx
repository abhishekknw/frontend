import React from 'react';
import MachadaloHeader from '../common/header/Header';
import DateFilter from '../common/date-range-filter/dateFilter';
import GraphChart from '../common/Graphs/Graph';
import LeadsTable from './Leads';
import ViewTable from './ViewTable';
import PieChart from '../common/pie-chart/PieChart';

export default function MachadaloDashboard(props) {

  return (
    <>
      <div className='container'>
        <MachadaloHeader />
        {/* <h2>Machadalo Dashboard</h2> */}

        <DateFilter />
        <div className='dx'>
          <div className='graph-chart'>
            <GraphChart />
          </div>
          <div>
            <PieChart />
          </div>
        </div>
        <LeadsTable />
        <ViewTable />
      </div>
    </>
  );
}
