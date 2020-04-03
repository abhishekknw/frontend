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
        let { society_city, city } = row;
        if (society_city) city = society_city;
        return city || 'Not Defined';
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
      formatter: (cell, row) => {
        const { name, city, contact_name_filled_suppliers, contact_name_filled_count } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_name_filled_count && contact_name_filled_suppliers.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `suppliers`,
                  state: {
                    suppliers: contact_name_filled_suppliers,
                    type: 'Contact Name Filled',
                    isCampaign: false,
                    name: `${name} Entities of ${city} City`,
                  },
                }}
              >
                {' '}
                {contact_name_filled_count}
                {/* <p style={{ color: 'green' }}>
                  ({flat_count_details_filled_percentage}
                  %)
                </p> */}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_name_total_filled_count',
      text: 'Total Filled',
      row: 1,
      width: '100px',
      formatter: (cell, row) => {
        const {
          contact_name_total_filled_suppliers,
          contact_name_total_filled_count,
          name,
          city,
        } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_name_total_filled_count && contact_name_total_filled_suppliers.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `suppliers`,
                  state: {
                    suppliers: contact_name_total_filled_suppliers,
                    type: 'Contact Name Total Filled',
                    isCampaign: false,
                    name: `${name} Entities of ${city} City`,
                  },
                }}
              >
                {' '}
                {contact_name_total_filled_count}
                {/* <p style={{ color: 'green' }}>
                  ({flat_count_details_filled_percentage}
                  %)
                </p> */}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_name_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '100px',
      formatter: (cell, row) => {
        const {
          contact_name_not_filled_suppliers,
          contact_name_not_filled_count,
          name,
          city,
        } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_name_not_filled_count && contact_name_not_filled_suppliers.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `suppliers`,
                  state: {
                    suppliers: contact_name_not_filled_suppliers,
                    type: 'Contact Name Not Filled',
                    isCampaign: false,
                    name: `${name} Entities of ${city} City`,
                  },
                }}
              >
                {' '}
                {contact_name_not_filled_count}
                {/* <p style={{ color: 'green' }}>
                  ({flat_count_details_filled_percentage}
                  %)
                </p> */}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
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
      formatter: (cell, row) => {
        const { contact_number_filled_suppliers, contact_number_filled_count, name, city } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_number_filled_count && contact_number_filled_suppliers.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `suppliers`,
                  state: {
                    suppliers: contact_number_filled_suppliers,
                    type: 'Contact Number Filled',
                    isCampaign: false,
                    name: `${name} Entities of ${city} City`,
                  },
                }}
              >
                {' '}
                {contact_number_filled_count}
                {/* <p style={{ color: 'green' }}>
                  ({flat_count_details_filled_percentage}
                  %)
                </p> */}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_number_total_filled_count',
      text: 'Total Filled',
      row: 1,
      width: '100px',
      formatter: (cell, row) => {
        const {
          contact_number_total_filled_suppliers,
          contact_number_total_filled_count,
          name,
          city,
        } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_number_total_filled_count &&
            contact_number_total_filled_suppliers.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `suppliers`,
                  state: {
                    suppliers: contact_number_total_filled_suppliers,
                    type: 'Contact Number Total Filled',
                    isCampaign: false,
                    name: `${name} Entities of ${city} City`,
                  },
                }}
              >
                {' '}
                {contact_number_total_filled_count}
                {/* <p style={{ color: 'green' }}>
                  ({flat_count_details_filled_percentage}
                  %)
                </p> */}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
    {
      dataField: 'contact_number_not_filled_count',
      text: 'Not Filled',
      row: 1,
      width: '100px',
      formatter: (cell, row) => {
        const {
          contact_number_not_filled_suppliers,
          contact_number_not_filled_count,
          name,
          city,
        } = row;
        // Get supplier details from supplier ids
        return (
          <div>
            {contact_number_not_filled_count && contact_number_not_filled_suppliers.length > 0 ? (
              <Link
                style={{ color: '#e8578d' }}
                to={{
                  pathname: `suppliers`,
                  state: {
                    suppliers: contact_number_not_filled_suppliers,
                    type: 'Contact Number Not Filled',
                    isCampaign: false,
                    name: `${name} Entities of ${city} City`,
                  },
                }}
              >
                {' '}
                {contact_number_not_filled_count}
                {/* <p style={{ color: 'green' }}>
                  ({flat_count_details_filled_percentage}
                  %)
                </p> */}
              </Link>
            ) : (
              0
            )}
          </div>
        );
      },
    },
  ];
};

export default getEntityCitywiseCount;
