import React from 'react';
import MachadaloHeader from '../common/header/Header';
import DateFilter from '../common/date-range-filter/dateFilter';
import GraphChart from '../common/Graphs/Graph';
import LeadsTable from './Leads';
import PieChart from '../common/pie-chart/PieChart';

export default function MachadaloDashboard(props) {
  return (
    <>
      <div className="container">
        <div className="machadalo-deshboard">
          <MachadaloHeader />
          <DateFilter />
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
          {/* Breadcrumb */}
          <nav>
            <ol class="breadcrumb " itemscope itemtype="http://schema.org/BreadcrumbList">
              <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" href="#">
                  <span itemprop="name">View Client</span>
                </a>
                <meta itemprop="position" content="1" />
              </li>
              <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" href="#">
                  <span itemprop="name">View Campaign</span>
                </a>
                <meta itemprop="position" content="2" />
              </li>
              <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" href="#">
                  <span itemprop="name">View City</span>
                </a>
                <meta itemprop="position" content="3" />
              </li>
              <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item" href="#">
                  <span itemprop="name">View Leads</span>
                </a>
                <meta itemprop="position" content="4" />
              </li>
            </ol>
          </nav>
          {/* Breadcrumb */}
        </div>
      </div>
    </>
  );
}
