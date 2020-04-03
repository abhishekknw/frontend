import React from 'react';
import { Link } from 'react-router-dom';

const getEntityCount = () => {
  return [
    {
      dataField: 'name',
      text: 'Entity Type',
      sort: true,
      row: 0,
      rowSpan: 2,
      width: '250px',
      formatter: (cell, row) => {
        const { type, name, supplier_count } = row;
        return (
          <div>
            {supplier_count > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `city/${type}/`,
                  state: {
                    supplier_type: type,
                    name,
                  },
                }}
              >
                {' '}
                {name}
              </Link>
            ) : (
              name
            )}
          </div>
        );
      },
    },
    {
      dataField: 'supplier_count',
      text: 'Entity Count',
      row: 0,
      rowSpan: 2,
      width: '150px',
    },
    {
      dataField: 'contact_name',
      text: 'Contact Name',
      row: 0,
      colSpan: 3,
      sort: false,
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

export default getEntityCount;
