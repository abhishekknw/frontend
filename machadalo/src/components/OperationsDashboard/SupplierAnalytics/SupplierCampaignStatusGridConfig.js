import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getCampaignColumn = () => {
  return [
    {
      dataField: 'status',
      text: 'Campaign Status',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        let status = get(row, 'booking_status');
        let variant =
          status === 'completed' ? 'success' : status === 'confirmed_booked' ? 'info' : 'danger';
        return <CampaignBadge variant={variant}>{status}</CampaignBadge>;
      },
    },
    {
      dataField: 'permission_box_count',
      text: 'Permission Box Count',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'comments_count',
      text: 'Comments Count',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'receipt_count',
      text: 'Receipt Count',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'supplier_count',
      text: 'Supplier Count',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'supplier',
      text: 'Suppliers',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return <Link to="hello">View Suppliers</Link>;
      },
    },
    // {
    //   dataField: 'payment_method',
    //   text: 'Payment Method',
    //   row: 0,
    //   rowSpan: 2,
    // },
    // {
    //   dataField: 'comments_count',
    //   text: 'Comments Count',
    //   row: 0,
    //   rowSpan: 2,
    // },
  ];
};

export default getCampaignColumn;
