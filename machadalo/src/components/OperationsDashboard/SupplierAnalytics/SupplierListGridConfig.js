import React from 'react';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';
import config from '../../../config';

const getSupplierColumn = () => {
  return [
    {
      dataField: 'supplier_id',
      text: 'Supplier Id',
      sort: true,
      formatter: (cell, row) => {
        let { supplier_id } = row;
        return supplier_id || '-';
      },
    },
    {
      dataField: 'name',
      text: 'Name',
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        const { supplier_id, name, supplier_type_code } = row;
        let supplier_type = 'society';
        switch (supplier_type_code) {
          case 'CP':
            supplier_type = 'corporate';
            break;
          case 'RE':
            supplier_type = 'retailshop';
            break;
          case 'GY':
            supplier_type = 'gym';
            break;
          case 'EI':
            supplier_type = 'educational';
            break;
          case 'BS':
            supplier_type = 'busshelter';
            break;
          default:
            supplier_type = 'society';
        }
        const supplierFormUrl = `${config.mainSiteUrl}/#/${supplier_type}/${supplier_id}`;
        // const supplierFormUrl = `https://forms.machadalo.com/#/${supplier_type}/${supplier_id}`;
        return (
          <a href={supplierFormUrl} style={{ color: '#e8578d' }} target="_blank">
            {name}
          </a>
        );
      },
    },
    {
      dataField: 'society_quality',
      text: 'Type',
      formatter: (cell, row) => {
        const { society_quality } = row;
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
            variant = 'default';
            break;
        }
        return <CampaignBadge variant={variant}>{society_quality}</CampaignBadge>;
      },
      sort: true,
    },
    {
      dataField: 'area',
      text: 'Area',
      sort: true,
      formatter: (cell, row) => {
        const { area } = row;
        return area || '-';
      },
    },
    {
      dataField: 'subarea',
      text: 'Sub Area',
      sort: true,
      formatter: (cell, row) => {
        const { subarea } = row;
        return subarea || '-';
      },
    },
    {
      dataField: 'city',
      text: 'City',
      sort: true,
      formatter: (cell, row) => {
        const { city } = row;
        return city || '-';
      },
    },
    {
      dataField: 'address',
      text: 'Address',
      sort: true,
      formatter: (cell, row) => {
        const { address } = row;
        return address || '';
      },
    },
    {
      dataField: 'contact_name',
      text: 'Contact Name',
      formatter: (cell, row) => {
        const { contact_name } = row;
        return contact_name || '-';
      },
    },
    {
      dataField: 'contact_number',
      text: 'Contact Number',
      formatter: (cell, row) => {
        const { contact_number } = row;
        return contact_number || '-';
      },
    },
    {
      dataField: 'contact_type',
      text: 'Designation',
      sort: true,
      formatter: (cell, row) => {
        const contact_type = get(row, 'contact_type');
        const type = contact_type ? contact_type.toLowerCase().replace(/ /g, '_') : contact_type;
        let variant = 'success';
        switch (type) {
          case 'chairman':
            variant = 'success';
            break;
          case 'secretary':
            variant = 'primary';
            break;
          case 'manager':
            variant = 'warning';
            break;
          case 'treasurer':
            variant = 'info';
            break;
          case 'committe_member':
            variant = 'danger';
            break;
          default:
            variant = 'default';
            break;
        }
        return <CampaignBadge variant={variant}>{type}</CampaignBadge>;
      },
    },
    {
      dataField: 'payment_method',
      text: 'Payment Method',
      formatter: (cell, row) => {
        const { payment_method } = row;
        return payment_method || '-';
      },
    },
  ];
};

export default getSupplierColumn;
