import React from 'react';
import CampaignBadge from '../../CampaignBadge';

const getEntityList = () => {
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
      width: '250px',
      sort: true,
      formatter: (cell, row) => {
        let { supplier_id, name, society_name, supplierTypeCode } = row;
        if (society_name) name = society_name;
        let supplier_type = 'society';
        switch (supplierTypeCode) {
          case 'CP':
            supplier_type = 'corporate';
          case 'RE':
            supplier_type = 'retailshop';
          case 'GY':
            supplier_type = 'gym';
          case 'EI':
            supplier_type = 'educational';
          case 'BS':
            supplier_type = 'busshelter';
        }
        const supplierFormUrl = `https://forms.machadalo.com/#/${supplier_type}/${supplier_id}`;
        return (
          <a href={supplierFormUrl} style={{ color: '#e8578d' }} target="_blank">
            {name}
          </a>
        );
      },
    },
    {
      dataField: 'area',
      text: 'Area',
      sort: true,
      formatter: (cell, row) => {
        let { area, society_locality } = row;
        if (society_locality) area = society_locality;
        return area || '-';
      },
    },
    {
      dataField: 'subarea',
      text: 'Sub Area',
      sort: true,
      formatter: (cell, row) => {
        let { subarea, society_subarea } = row;
        if (society_subarea) subarea = society_subarea;
        return subarea || '-';
      },
    },
    {
      dataField: 'city',
      text: 'City',
      sort: true,
      formatter: (cell, row) => {
        let { city, society_city } = row;
        if (society_city) city = society_city;
        return city || '-';
      },
    },
    {
      dataField: 'address',
      text: 'Address',
      sort: true,
      width: '350px',
      formatter: (cell, row) => {
        let { address1, society_address1 } = row;
        let address = address1;
        if (society_address1) address = society_address1;
        return address || '-';
      },
    },
    {
      dataField: 'contact_name',
      text: 'Contact Name',
      sort: true,
      formatter: (cell, row) => {
        const { contact_name } = row;
        return contact_name || '-';
      },
    },
    {
      dataField: 'contact_number',
      text: 'Contact Number',
      sort: true,
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
        const { contact_type } = row;
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
  ];
};

export default getEntityList;
