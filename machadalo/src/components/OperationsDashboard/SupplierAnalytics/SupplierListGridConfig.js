import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getSupplierColumn = () => {
  return [
    {
      dataField: 'society_quality',
      text: 'Type',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        let society_quality = get(row, 'society_quality');
        let variant = 'success';
        switch (society_quality) {
          case 'Standard':
            variant = 'success';
            break;
          case 'Medium High':
            variant = 'info';
            break;
          case 'Ultra High':
            variant = 'warning';
            break;
          case 'High':
            variant = 'primary';
            break;
          default:
            variant = 'danger';
            break;
        }
        return <CampaignBadge variant={variant}>{society_quality}</CampaignBadge>;
      },
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      row: 0,
      rowSpan: 2,
      width: '300px',
      sort: true,
    },
    {
      dataField: 'locality',
      text: 'Locality',
      row: 0,
      rowSpan: 2,
      sort: true,
    },
    {
      dataField: 'subarea',
      text: 'Sub Area',
      row: 0,
      rowSpan: 2,
      sort: true,
    },
    {
      dataField: 'city',
      text: 'City',
      row: 0,
      rowSpan: 2,
      sort: true,
    },
    {
      dataField: 'is_completed',
      text: 'Completed',
      row: 0,
      rowSpan: 2,
      sort: true,
    },
    {
      dataField: 'society_quantity',
      text: 'Society Quantity',
      row: 0,
      rowSpan: 2,
      sort: true,
    },
    {
      dataField: 'payment_method',
      text: 'Payment Method',
      row: 0,
      rowSpan: 2,
    },
  ];
};

export default getSupplierColumn;
