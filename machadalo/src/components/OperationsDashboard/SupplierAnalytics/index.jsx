import React from 'react';
import { Link } from 'react-router-dom';
import getCampaignSummaryColumn from './SupplierCampaignSummaryGridConfig';
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
  console.log(data);
  return (
    <div>
      {supplierData && (
        <InnerGrid
          columns={getCampaignSummaryColumn()}
          data={data}
          exportCsv={false}
          search={false}
          pagination={false}
          backgroundColor="white"
        />
      )}
      <Link
        to={`/r/operations-dashboard/${supplierData.campaign_id}`}
        className="btn btn--danger"
        style={{ marginTop: '8px' }}
      >
        View Suppliers
      </Link>
    </div>
  );
};

export default SupplierAnalytics;
