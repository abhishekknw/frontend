import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getCampaignColumn = () => {
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
      dataField: 'supplier_count',
      text: 'Entity Count',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'city',
      text: 'City',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'flat_count_details',
      text: 'Flat Count',
      row: 0,
      colSpan: 2,
      sort: false,
    },
    {
      dataField: 'flat_count_details_filled',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
    },
    {
      dataField: 'flat_count_details_not_filled',
      text: 'Not Filled',
      row: 1,
      width: '100px',
      sort: false,
    },
    {
      dataField: 'contact_name',
      text: 'Contact Name',
      row: 0,
      colSpan: 3,
      sort: false,
    },
    {
      dataField: 'contact_name_filled',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const { campaign_id, contact_name_filled, contact_name_filled_suppliers, name } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_name_filled_suppliers.length > 0 ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: contact_name_filled_suppliers,
                    campaign_id,
                    campaign_name: name,
                    type: 'Contact Name Filled',
                  },
                }}
              >
                {' '}
                {contact_name_filled}
              </Link>
            ) : (
              contact_name_filled
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_name_filled_total',
      text: 'Total Filled',
      row: 1,
      width: '100px',
      sort: false,
    },
    {
      dataField: 'contact_name_not_filled',
      text: 'Not Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          contact_name_not_filled,
          contact_name_not_filled_suppliers,
          name,
        } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_name_not_filled_suppliers.length > 0 ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: contact_name_not_filled_suppliers,
                    campaign_id,
                    campaign_name: name,
                    type: 'Contact Name Not Filled',
                  },
                }}
              >
                {' '}
                {contact_name_not_filled}
              </Link>
            ) : (
              contact_name_not_filled
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_number',
      text: 'Contact Number',
      row: 0,
      colSpan: 3,
      sort: false,
    },
    {
      dataField: 'contact_number_filled',
      text: 'Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const { campaign_id, contact_number_filled, contact_number_filled_suppliers, name } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_number_filled_suppliers.length > 0 ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: contact_number_filled_suppliers,
                    campaign_id,
                    campaign_name: name,
                    type: 'Contact Number Filled',
                  },
                }}
              >
                {' '}
                {contact_number_filled}
              </Link>
            ) : (
              contact_number_filled
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_number_filled_total',
      text: 'Total Filled',
      row: 1,
      width: '100px',
      sort: false,
    },
    {
      dataField: 'contact_number_not_filled',
      text: 'Not Filled',
      row: 1,
      width: '100px',
      sort: false,
      formatter: (cell, row) => {
        const {
          campaign_id,
          contact_number_not_filled,
          contact_number_not_filled_suppliers,
          name,
        } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_number_not_filled_suppliers.length > 0 ? (
              <Link
                to={{
                  pathname: `operations-dashboard/${campaign_id}/suppliers`,
                  state: {
                    suppliers: contact_number_not_filled_suppliers,
                    campaign_id,
                    campaign_name: name,
                    type: 'Contact Number Not Filled',
                  },
                }}
              >
                {' '}
                {contact_number_not_filled}
              </Link>
            ) : (
              contact_number_not_filled
            )}
          </div>
        );
      },
    },
    // {
    //   dataField: 'payment_details',
    //   text: 'Payment Details',
    //   row: 0,
    //   colSpan: 2,
    //   sort: false,
    // },
    // {
    //   dataField: 'payment_details_filled',
    //   text: 'Filled',
    //   row: 1,
    //   width: '100px',
    //   sort: false,
    // },
    // {
    //   dataField: 'payment_details_not_filled',
    //   text: 'Not Filled',
    //   row: 1,
    //   width: '100px',
    //   sort: false,
    // },
  ];
};

export default getCampaignColumn;
