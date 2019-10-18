import React from 'react';
import getSupplierColumn from './SupplierGridColumConfig';
import InnerGrid from '../../InnerGrid';

const addMissingDatafield = (data) => {
  const dataFields = [
    'Not Booked',
    'Not Initiated',
    'Recce',
    'Decision Pending',
    'completed',
    'Confirmed Booking',
    'Phone Booked',
    'Visit Booked',
    'Tentative Booking',
  ];
  dataFields.map((dataField) => {
    if (!data.hasOwnProperty(dataField)) {
      data[dataField] = 0;
    }
  });
  return [data];
};

const SupplierAnalytics = (props) => {
  const { supplierData } = props;
  const data = addMissingDatafield(supplierData);
  return <div>{supplierData && <InnerGrid columns={getSupplierColumn()} data={data} />}</div>;
};

export default SupplierAnalytics;
