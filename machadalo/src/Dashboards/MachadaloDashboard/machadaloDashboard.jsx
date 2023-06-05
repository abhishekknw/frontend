import React from 'react';
import MachadaloHeader from '../common/header/Header';
import DateFilter from '../common/date-range-filter/dateFilter';
import GraphChart from '../common/Graphs/Graph';
import LeadsTable from './Leads';
import PieChart from '../common/pie-chart/PieChart';
import {newLeadActions} from '../_actions/Machadalo/newLead.actions';

export default function MachadaloDashboard(props) {

  const NewLeadAction = newLeadActions();
  NewLeadAction.getAllCampaigns();
  function getDates(date){
    // console.log(date)
  }
  return (
    <>
      <div className="container">
        <div className="machadalo-deshboard">
          <MachadaloHeader />
          <DateFilter onDateChange={getDates} />
          <div className="dx">
            <div className="graph-chart">
              <GraphChart />
            </div>
            <div className="pc">
              <div className="piechart">
                <PieChart />
              </div>
            </div>
          </div>
          <div className="pb-5">
            <LeadsTable />
          </div>
        </div>
      </div>
    </>
  );
}
