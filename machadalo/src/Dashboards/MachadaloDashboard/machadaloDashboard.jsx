import React from 'react';
import MachadaloHeader from './Header';
import DateFilter from './dateFilter';
import Graph from './Graph';
import PieChart from './PieChart';
import LeadsTable from './Leads';
import ViewTable from './ViewTable';

export default function MachadaloDashboard(props) {

  return (
    <>
      <MachadaloHeader />
      {/* <h2>Machadalo Dashboard</h2> */}
      <DateFilter />
      <Graph />
      <PieChart />
      <LeadsTable />
      <ViewTable />
    </>
  );
}
