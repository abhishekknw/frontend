import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getCampaignColumn = () => {
  return [
    {
      dataField: 'status',
      text: 'Booking Status',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        let status = get(row, 'status');
        status = status ? status.toLowerCase() : status;
        let variant = 'success';
        switch (status) {
          case 'completed':
            variant = 'success';
            break;
          case 'confirmed booking':
            variant = 'primary';
            break;
          case 'decision pending':
            variant = 'warning';
            break;
          case 'tentative booking':
            variant = 'info';
            break;
          case 'not booked':
            variant = 'danger';
            break;
          default:
            variant = 'default';
            break;
        }
        return <CampaignBadge variant={variant}>{status}</CampaignBadge>;
      },
    },
    {
      dataField: 'supplier_count',
      text: 'Entity Count',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'internal_comments_count',
      text: 'Internal Comments Count',
      row: 0,
      rowSpan: 2,
      width: '300px',
      formatter: (cell, row) => {
        const { internal_comments_count } = row;
        return internal_comments_count || 0;
      },
    },
    {
      dataField: 'external_comments_count',
      text: 'External Comments Count',
      row: 0,
      rowSpan: 2,
      width: '300px',
      formatter: (cell, row) => {
        const { external_comments_count } = row;
        return external_comments_count || 0;
      },
    },
    {
      dataField: 'permission_box_count',
      text: 'Permission Box Count',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        const { permission_box_count, status } = row;
        if (status === 'completed') return permission_box_count;
        else return '-';
      },
    },
    {
      dataField: 'receipt_count',
      text: 'Receipt Count',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        const { receipt_count, status } = row;
        if (status === 'completed') return receipt_count;
        else return '-';
      },
    },
    {
      dataField: 'payment_method',
      text: 'Payment Method',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        const { payment_method } = row;
        return payment_method || '-';
      },
    },
    {
      dataField: 'supplier',
      text: 'Entity',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        const { campaign_id, status, supplier_count, campaign_name } = row;
        const isSuppliers = supplier_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/${status}/supplier`,
                  state: {
                    suppliers: cell,
                    campaign_id,
                    status,
                    campaign_name,
                  },
                }}
              >
                View Entities
              </Link>
            ) : (
              'No Entity'
            )}
          </div>
        );
      },
    },
  ];
};

export default getCampaignColumn;