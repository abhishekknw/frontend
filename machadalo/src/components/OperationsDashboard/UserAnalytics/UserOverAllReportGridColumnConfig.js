import React from 'react';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getColumnConfig = () => {
  // return [
  //   {
  //     dataField: 'campaign_id',
  //     text: 'Campaign Id',
  //   },
  //   {
  //     dataField: 'name',
  //     text: 'Campaign',
  //     width: '300px',
  //   },
  //   {
  //     dataField: 'campaign_status',
  //     text: 'Status',
  //     formatter: (cell, row) => {
  //       let status = get(row, 'campaign_status');
  //       let variant = status === 'completed' ? 'success' : status === 'ongoing' ? 'info' : 'danger';
  //       return <CampaignBadge variant={variant}>{status}</CampaignBadge>;
  //     },
  //   },
  //   {
  //     dataField: 'suppliers_assigned_count',
  //     text: 'Suppliers Assigned',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'confirmed_booked_count',
  //     text: 'Confirmed Booked',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'rejected_count',
  //     text: 'Rejected',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'decision_pending_count',
  //     text: 'Decision Pending',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'visit_booked_count',
  //     text: 'Visit Booked',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'visit_required_count',
  //     text: 'Visit Required',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'new_entity_count',
  //     text: 'New Entity',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'completed_count',
  //     text: 'Completed',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'not_initiated_count',
  //     text: 'Not Initiated',
  //     sort: false,
  //   },
  //   {
  //     dataField: 'not_booked_count',
  //     text: 'Not Booked',
  //     sort: false,
  //   },
  // ];
  return [
    {
      accessKey: 'campaign_id',
      title: 'Campaign Id',
    },
    {
      accessKey: 'name',
      title: 'Campaign',
      width: '300px',
      sort: true
    },
    {
      accessKey: 'action',
      title: 'Status',
      action: function (row) {
        let status = get(row, 'campaign_status');
        let variant = status === 'completed' ? 'success' : status === 'ongoing' ? 'info' : 'danger';
        return <CampaignBadge variant={variant}>{status}</CampaignBadge>;
      },
    },
    {
      accessKey: 'suppliers_assigned_count',
      title: 'Suppliers Assigned',
      sort: false,
    },
    {
      accessKey: 'confirmed_booked_count',
      title: 'Confirmed Booked',
      sort: false,
    },
    {
      accessKey: 'rejected_count',
      title: 'Rejected',
      sort: false,
    },
    {
      accessKey: 'decision_pending_count',
      title: 'Decision Pending',
      sort: false,
    },
    {
      accessKey: 'visit_booked_count',
      title: 'Visit Booked',
      sort: false,
    },
    {
      accessKey: 'visit_required_count',
      title: 'Visit Required',
      sort: false,
    },
    {
      accessKey: 'new_entity_count',
      title: 'New Entity',
      sort: false,
    },
    {
      accessKey: 'completed_count',
      title: 'Completed',
      sort: false,
    },
    {
      accessKey: 'not_initiated_count',
      title: 'Not Initiated',
      sort: false,
    },
    {
      accessKey: 'not_booked_count',
      title: 'Not Booked',
      sort: false,
    },
  ];
};

export default getColumnConfig;
