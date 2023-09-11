import React from 'react';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';
import config from '../../../config';
const linkStyle = {
  'a:link': { color: '#000' },
};

const getSupplierColumnContactDetails = () => {
  let unit_count = 'Flat Count';
  let type = 'Society Type';
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
      dataField: 'flat_count',
      text: unit_count,
      sort: true,
      formatter: (cell, row) => {
        let { flat_count } = row;
        if (flat_count) flat_count = flat_count;
        return flat_count || '-';
      },
    },
    {
      dataField: 'society_type',
      text: type,
      sort: true,
      formatter: (cell, row) => {
        let { society_type } = row;
        if (society_type) society_type = society_type;
        return society_type || '-';
      },
    },
    {
      dataField: 'latitude',
      text: 'Latitude',
      sort: true,
      formatter: (cell, row) => {
        const { latitude } = row;
        return latitude || '-';
      },
    },
    {
      dataField: 'longitude',
      text: 'Longitude',
      sort: true,
      formatter: (cell, row) => {
        const { longitude } = row;
        return longitude || '-';
      },
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
      width: '400px',
      formatter: (cell, row) => {
        const { address } = row;
        return address || '-';
      },
    },
    {
      dataField: 'landmark',
      text: 'Landmark',
      sort: true,
      width: '400px',
      formatter: (cell, row) => {
        const { landmark } = row;
        return landmark || '-';
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
      text: 'Contact Type',
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
          case 'president':
            variant = 'danger';
            break;
          default:
            variant = 'default';
            break;
        }
        return <CampaignBadge variant={variant}>{type}</CampaignBadge>;
      },
    },
  ];
};

export default getSupplierColumnContactDetails;
