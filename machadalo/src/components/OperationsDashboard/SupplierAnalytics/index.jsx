import React from 'react';
import getSupplierColumn from './SupplierGridColumConfig';
import InnerGrid from '../../InnerGrid';

const SupplierAnalytics = (props) => {
  const { supplierData } = props;
  const { data } = supplierData;
  return <div>{data && <InnerGrid columns={getSupplierColumn()} data={[data]} />}</div>;
};

export default SupplierAnalytics;
