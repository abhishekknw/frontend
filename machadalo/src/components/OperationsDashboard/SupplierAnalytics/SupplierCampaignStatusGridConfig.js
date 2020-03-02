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
        const status = get(row, 'status');
        const colorStatus = status ? status.toLowerCase().replace(/ /g, '_') : status;
        let variant = 'success';
        switch (colorStatus) {
          case 'completed':
            variant = 'success';
            break;
          case 'confirmed_booking':
            variant = 'primary';
            break;
          case 'decision_pending':
            variant = 'warning';
            break;
          case 'tentative_booking':
            variant = 'info';
            break;
          case 'not_booked':
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
      width: '150px',
      formatter: (cell, row) => {
        const { campaign_id, status, supplier_count, campaign_name, supplier } = row;
        const isSuppliers = supplier_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/${status}/supplier`,
                  state: {
                    suppliers: supplier,
                    campaign_id,
                    status,
                    campaign_name,
                  },
                }}
              >
                {supplier_count}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'internal_comments_count',
      text: 'Internal Comments',
      row: 0,
      colSpan: 2,
      width: '200px',
    },
    {
      dataField: 'internal_comments_filled_count',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const { internal_comments_filled_count } = row;
        return internal_comments_filled_count || 0;
      },
    },
    {
      dataField: 'internal_comments_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '120px',
      sort: false,
      formatter: (cell, row) => {
        const { internal_comments_not_filled_count } = row;
        return internal_comments_not_filled_count || 0;
      },
    },
    {
      dataField: 'external_comments_count',
      text: 'External Comments',
      row: 0,
      colSpan: 2,
      width: '200px',
    },
    {
      dataField: 'external_comments_filled_count',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const { external_comments_filled_count } = row;
        return external_comments_filled_count || 0;
      },
    },
    {
      dataField: 'external_comments_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '120px',
      sort: false,
      formatter: (cell, row) => {
        const { external_comments_not_filled_count } = row;
        return external_comments_not_filled_count || 0;
      },
    },
    {
      dataField: 'permission_box_count',
      text: 'Permission Box Count',
      row: 0,
      rowSpan: 2,
      sort: false,
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
      sort: false,
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
      sort: false,
      formatter: (cell, row) => {
        const { payment_method } = row;
        return payment_method || '-';
      },
    },
  ];
};

export default getCampaignColumn;
