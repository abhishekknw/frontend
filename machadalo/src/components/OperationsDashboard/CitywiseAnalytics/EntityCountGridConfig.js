import React from 'react';
import { Link } from 'react-router-dom';

const getEntityCount = () => {
  return [
    {
      dataField: 'name',
      text: 'Entity Type',
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        const { type, name, count } = row;
        return (
          <div>
            {count > 0 ? (
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
      dataField: 'count',
      text: 'Total',
      sort: false,
    },
  ];
};

export default getEntityCount;
