import React from 'react';
import getSupplierColumn from './SupplierGridColumConfig';
import InnerGrid from '../../InnerGrid';

class SupplierAnalytics extends React.Component {
  render() {
    const data = [];
    return <InnerGrid columns={getSupplierColumn()} data={data} />;
  }
}

export default SupplierAnalytics;
