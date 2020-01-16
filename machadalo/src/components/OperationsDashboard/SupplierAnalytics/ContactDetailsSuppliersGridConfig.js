import React from 'react';

const getSupplierColumnContactDetails = () => {
  return [
    {
      dataField: 'society_name',
      text: 'Name',
      row: 0,
      rowSpan: 2,
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
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { society_locality } = row;
        return society_locality || '-';
      },
    },
    {
      dataField: 'society_subarea',
      text: 'Sub Area',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { society_subarea } = row;
        return society_subarea || '-';
      },
    },
    {
      dataField: 'society_city',
      text: 'City',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { society_city } = row;
        return society_city || '-';
      },
    },
    {
      dataField: 'society_state',
      text: 'State',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        const { society_state } = row;
        return society_state || '-';
      },
    },
  ];
};

export default getSupplierColumnContactDetails;
