import React from 'react';

const getEntityCitywiseCount = () => {
  return [
    {
      dataField: 'society_city',
      text: 'City',
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        let { society_city, city } = row;
        if (society_city) city = society_city;
        return city || '-';
      },
    },
    {
      dataField: 'dcount',
      text: 'Total',
      sort: false,
    },
  ];
};

export default getEntityCitywiseCount;
