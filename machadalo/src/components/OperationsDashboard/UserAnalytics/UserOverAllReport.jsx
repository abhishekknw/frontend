import React from 'react';
import InnerGrid from '../../InnerGrid';
import getColumnConfig from './UserOverAllReportGridColumnConfig';

class UserOverAllReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bootstrap-iso">
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
