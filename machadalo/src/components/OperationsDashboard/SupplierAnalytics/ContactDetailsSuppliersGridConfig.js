import React from 'react';

const getSupplierColumnContactDetails = () => {
  return [
    {
      dataField: 'society_name',
      text: 'Name',
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        const { society_longitude, society_latitude, society_name } = row;
        const googleMapUrl = `https://www.google.com/maps/?q=+${society_latitude}+=+${society_longitude}`;
        return <a href={googleMapUrl}>{society_name}</a>;
      },
    },
    {
      dataField: 'society_locality',
      text: 'Area',
      sort: true,
      formatter: (cell, row) => {
        const { society_locality } = row;
        return society_locality || '-';
      },
    },
    {
      dataField: 'society_subarea',
      text: 'Sub Area',
      sort: true,
      formatter: (cell, row) => {
        const { society_subarea } = row;
        return society_subarea || '-';
      },
    },
    {
      dataField: 'society_city',
      text: 'City',
      sort: true,
      formatter: (cell, row) => {
        const { society_city } = row;
        return society_city || '-';
      },
    },
    {
      dataField: 'society_address1',
      text: 'Address',
      sort: true,
      width: '400px',
      formatter: (cell, row) => {
        const { society_address1 } = row;
        return society_address1 || '-';
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
  ];
};

export default getSupplierColumnContactDetails;
