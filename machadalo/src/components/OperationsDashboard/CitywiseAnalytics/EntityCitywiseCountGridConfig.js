import React from 'react';
import { Link } from 'react-router-dom';

const getEntityCitywiseCount = () => {
  return [
    {
      dataField: 'society_city',
      text: 'City',
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        let { society_city, city, type, name } = row;
        if (society_city) city = society_city;
        return (
          <div>
            {city && city.length > 0 ? (
              <Link
                to={{
                  pathname: `?city=${city}`,
                  state: {
                    supplier_type: type,
                    city,
                    name,
                  },
                }}
              >
                {city}
              </Link>
            ) : (
              '-'
            )}
          </div>
        );
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
