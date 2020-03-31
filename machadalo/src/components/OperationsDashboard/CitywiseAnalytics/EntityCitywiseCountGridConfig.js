import React from 'react';
import { Link } from 'react-router-dom';

const getEntityCitywiseCount = () => {
  return [
    {
      dataField: 'city',
      text: 'City',
      width: '150px',
      row: 0,
      rowSpan: 2,
      sort: true,
      formatter: (cell, row) => {
        let { society_city, city, type, name } = row;
        if (society_city) city = society_city;
        return city || null;
      },
    },
    {
      dataField: 'count',
      text: 'Entity Count',
      width: '150px',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        let { count, city, type, name } = row;
        return (
          <div>
            {city && city.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `?city=${city}`,
                  state: {
                    supplier_type: type,
                    city,
                    name,
                  },
                }}
              >
                {count}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_name',
      text: 'Contact Name',
      row: 0,
      colSpan: 3,
    },
    {
      dataField: 'contact_name_filled_count',
      text: 'Filled(Unique)',
      row: 1,
      width: '150px',
    },
    {
      dataField: 'contact_name_total_filled_count',
      text: 'Total Filled',
      row: 1,
      width: '100px',
    },
    {
      dataField: 'contact_name_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '100px',
    },
    {
      dataField: 'contact_number',
      text: 'Contact Number',
      row: 0,
      colSpan: 3,
      sort: false,
    },
    {
      dataField: 'contact_number_filled_count',
      text: 'Filled(Unique)',
      row: 1,
      width: '150px',
    },
    {
      dataField: 'contact_number_total_filled_count',
      text: 'Total Filled',
      row: 1,
      width: '100px',
    },
    {
      dataField: 'contact_number_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '100px',
    },
  ];
};

export default getEntityCitywiseCount;
