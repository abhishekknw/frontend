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
        const { campaign_id, status, supplier_count, campaign_name, supplier_ids } = row;
        const isSuppliers = supplier_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: supplier_ids,
                    campaign_id,
                    type: status,
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
        const {
          campaign_id,
          internal_comments_filled_count,
          campaign_name,
          internal_comments_filled_suppliers,
          internal_comments_filled_percentage,
        } = row;
        const isSuppliers = internal_comments_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: internal_comments_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'Internal Comments Filled',
                  },
                }}
              >
                {internal_comments_filled_count}{' '}
                <p style={{ color: 'green' }}>({internal_comments_filled_percentage} %)</p>
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'internal_comments_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '120px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          internal_comments_not_filled_count,
          campaign_name,
          internal_comments_not_filled_suppliers,
          internal_comments_not_filled_percentage,
        } = row;
        const isSuppliers = internal_comments_not_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: internal_comments_not_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'Internal Comments Not Filled',
                  },
                }}
              >
                {internal_comments_not_filled_count}{' '}
                <p style={{ color: 'green' }}>({internal_comments_not_filled_percentage} %)</p>
              </Link>
            ) : (
              0
            )}
          </div>
        );
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
        const {
          campaign_id,
          external_comments_filled_count,
          campaign_name,
          external_comments_filled_suppliers,
          external_comments_filled_percentage,
        } = row;
        const isSuppliers = external_comments_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: external_comments_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'External Comments Filled',
                  },
                }}
              >
                {external_comments_filled_count}{' '}
                <p style={{ color: 'green' }}>({external_comments_filled_percentage} %)</p>
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'external_comments_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '120px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          external_comments_not_filled_count,
          campaign_name,
          external_comments_not_filled_suppliers,
          external_comments_not_filled_percentage,
        } = row;
        const isSuppliers = external_comments_not_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: external_comments_not_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'External Comments Not Filled',
                  },
                }}
              >
                {external_comments_not_filled_count}{' '}
                <p style={{ color: 'green' }}>({external_comments_not_filled_percentage} %)</p>
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'permission_box',
      text: 'Permission Box',
      row: 0,
      colSpan: 2,
      width: '200px',
    },
    {
      dataField: 'permission_box_filled_count',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          permission_box_filled_count,
          campaign_name,
          permission_box_filled_suppliers,
          permission_box_filled_percentage,
        } = row;
        const isSuppliers = permission_box_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: permission_box_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'Permission Box Filled',
                  },
                }}
              >
                {permission_box_filled_count}{' '}
                <p style={{ color: 'green' }}>({permission_box_filled_percentage} %)</p>
              </Link>
            ) : (
              '-'
            )}
          </div>
        );
      },
    },
    {
      dataField: 'permission_box_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '120px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          permission_box_not_filled_count,
          campaign_name,
          permission_box_not_filled_suppliers,
          permission_box_not_filled_percentage,
        } = row;
        const isSuppliers = permission_box_not_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: permission_box_not_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'Permission Box Not Filled',
                  },
                }}
              >
                {permission_box_not_filled_count}{' '}
                <p style={{ color: 'green' }}>({permission_box_not_filled_percentage} %)</p>
              </Link>
            ) : (
              '-'
            )}
          </div>
        );
      },
    },
    {
      dataField: 'receipt',
      text: 'Receipt',
      row: 0,
      colSpan: 2,
      width: '200px',
    },
    {
      dataField: 'receipt_filled_count',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          receipt_filled_count,
          campaign_name,
          receipt_filled_suppliers,
          receipt_filled_percentage,
        } = row;
        const isSuppliers = receipt_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: receipt_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'Receipt Filled',
                  },
                }}
              >
                {receipt_filled_count}{' '}
                <p style={{ color: 'green' }}>({receipt_filled_percentage} %)</p>
              </Link>
            ) : (
              '-'
            )}
          </div>
        );
      },
    },
    {
      dataField: 'receipt_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '120px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          receipt_not_filled_count,
          campaign_name,
          receipt_not_filled_suppliers,
          receipt_not_filled_percentage,
        } = row;
        const isSuppliers = receipt_not_filled_count > 0 ? true : false;
        return (
          <div>
            {isSuppliers ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: receipt_not_filled_suppliers,
                    campaign_id,
                    campaign_name,
                    type: 'Receipt Not Filled',
                  },
                }}
              >
                {receipt_not_filled_count}{' '}
                <p style={{ color: 'green' }}>({receipt_not_filled_percentage} %)</p>
              </Link>
            ) : (
              '-'
            )}
          </div>
        );
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
