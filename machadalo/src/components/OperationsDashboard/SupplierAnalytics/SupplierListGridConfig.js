import React from 'react';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getSupplierColumn = () => {
  return [
    {
      dataField: 'name',
      text: 'Name',
      row: 0,
      rowSpan: 2,
      width: '350px',
      sort: true,
    },
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
      dataField: 'society_address1',
      text: 'Address',
      row: 0,
      rowSpan: 2,
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        const { society_address1 } = row;
        return society_address1 || '-';
      },
    },
    {
      dataField: 'locality',
      text: 'Locality',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { locality } = row;
        return locality || '-';
      },
    },
    {
      dataField: 'subarea',
      text: 'Sub Area',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { subarea } = row;
        return subarea || '-';
      },
    },
    {
      dataField: 'landmark',
      text: 'Landmark',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { landmark } = row;
        return landmark || '-';
      },
    },
    {
      dataField: 'city',
      text: 'City',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { city } = row;
        return city || '-';
      },
    },
    {
      dataField: 'society_longitude',
      text: 'Longitude',
      row: 0,
      rowSpan: 2,
      sort: false,
      formatter: (cell, row) => {
        const { society_longitude } = row;
        return society_longitude || '-';
      },
    },
    {
      dataField: 'society_latitude',
      text: 'Latitude',
      row: 0,
      rowSpan: 2,
      sort: false,
      formatter: (cell, row) => {
        const { society_latitude } = row;
        return society_latitude || '-';
      },
    },
    {
      dataField: 'is_completed',
      text: 'Completed',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { is_completed } = row;
        return is_completed || '-';
      },
    },
    {
      dataField: 'society_quantity',
      text: 'Size',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { society_quantity } = row;
        return society_quantity || '-';
      },
    },
    {
      dataField: 'payment_method',
      text: 'Payment Method',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        const { payment_method } = row;
        return payment_method || '-';
      },
    },
  ];
};

export default getSupplierColumn;
