import React from 'react';
import InnerGrid from '../../InnerGrid';
import getColumnConfig from './UserOverAllReportGridColumnConfig';
import ReactBootstrapTable from '../../../Dashboards/Table/React-Bootstrap-table/ReactBootstrapTable';

class UserOverAllReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bootstrap-iso">
        {/* <ReactBootstrapTable headerData={getColumnConfig()} rowData={this.props.campaignList} /> */}
        <InnerGrid
          columns={getColumnConfig()}
          data={this.props.campaignList}
          exportCsv={false}
          search={true}
          pagination={true}
        />
      </div>
    );
  }
}

export default UserOverAllReport;
