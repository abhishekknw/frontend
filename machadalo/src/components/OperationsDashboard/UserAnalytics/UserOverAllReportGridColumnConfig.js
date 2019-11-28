import React from 'react';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getColumnConfig = () => {
  return [
    {
      dataField: 'campaign_id',
      text: 'Campaign Id',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'name',
      text: 'Campaign',
      width: '300px',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'campaign_status',
      text: 'Status',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        let status = get(row, 'campaign_status');
        let variant = status === 'completed' ? 'success' : status === 'ongoing' ? 'info' : 'danger';
        return <CampaignBadge variant={variant}>{status}</CampaignBadge>;
      },
    },
    {
      dataField: 'suppliers_assigned_count',
      text: 'Suppliers Assigned',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'confirmed_booked_count',
      text: 'Confirmed Booked',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'rejected_count',
      text: 'Rejected',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'decision_pending_count',
      text: 'Decision Pending',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'visit_booked_count',
      text: 'Visit Booked',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'visit_required_count',
      text: 'Visit Required',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'new_entity_count',
      text: 'New Entity',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'completed_count',
      text: 'Completed',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'not_initiated_count',
      text: 'Not Initiated',
      row: 0,
      colSpan: 2,
    },
    {
      dataField: 'not_booked_count',
      text: 'Not Booked',
      row: 0,
      colSpan: 2,
    },
  ];
};

export default getColumnConfig;
