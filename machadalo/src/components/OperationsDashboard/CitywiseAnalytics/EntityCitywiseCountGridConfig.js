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
      row: 0,
      colSpan: 5,
    },
    {
      dataField: 'count',
      text: 'Total Count',
      width: '150px',
      row: 1,
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
      dataField: 'today_count',
      text: "Today's Count(% inc from yesterday)",
      row: 1,
      width: '300px',
      formatter: (cell, row) => {
        const { last_day_count, today_count } = row;
        let diff = today_count - last_day_count;
        let percentageChange = diff * 100;
        if (last_day_count > 0) {
          percentageChange = (diff / last_day_count) * 100;
          percentageChange = percentageChange.toFixed(2);
        }
        return (
          <div>
            {today_count}(
            <p style={{ color: 'green', fontSize: '15px', display: 'inline-flex' }}>
              {percentageChange}% {percentageChange > 0 && <span>&#8593;</span>}{' '}
              {percentageChange < 0 && <span style={{ color: 'red' }}>&#8595;</span>}{' '}
            </p>
            )
          </div>
        );
      },
    },
    {
      dataField: 'last_week_count',
      text: 'This Week Count(% inc from last week)',
      row: 1,
      width: '300px',
      formatter: (cell, row) => {
        const { last_week_count, this_week_count } = row;
        let diff = this_week_count - last_week_count;
        let percentageChange = diff * 100;
        if (last_week_count > 0) {
          percentageChange = (diff / last_week_count) * 100;
          percentageChange = percentageChange.toFixed(2);
        }
        return (
          <div>
            {this_week_count}(
            <p style={{ color: 'green', fontSize: '15px', display: 'inline-flex' }}>
              {percentageChange}% {percentageChange > 0 && <span>&#8593;</span>}{' '}
              {percentageChange < 0 && <span style={{ color: 'red' }}>&#8595;</span>}{' '}
            </p>
            )
          </div>
        );
      },
    },
    {
      dataField: 'last_month_count',
      text: 'This Month Count(% inc from last month)',
      width: '320px',
      row: 1,
      formatter: (cell, row) => {
        const { last_month_count, this_month_count } = row;
        let diff = this_month_count - last_month_count;
        let percentageChange = diff * 100;
        if (last_month_count > 0) {
          percentageChange = (diff / last_month_count) * 100;
          percentageChange = percentageChange.toFixed(2);
        }
        return (
          <div>
            {this_month_count}(
            <p style={{ color: 'green', fontSize: '15px', display: 'inline-flex' }}>
              {percentageChange}% {percentageChange > 0 && <span>&#8593;</span>}{' '}
              {percentageChange < 0 && <span style={{ color: 'red' }}>&#8595;</span>}
            </p>
            )
          </div>
        );
      },
    },
    {
      dataField: 'last_3_month_count',
      text: 'Last 3 Months Count',
      row: 1,
      formatter: (cell, row) => {
        const { last_3_month_count, this_month_count } = row;
        let diff = last_3_month_count - this_month_count;
        let percentageChange = diff * 100;
        if (diff > 0 && last_3_month_count > 0) {
          percentageChange = (diff / last_3_month_count) * 100;
          percentageChange = percentageChange.toFixed(2);
        }
        return <div>{last_3_month_count}</div>;
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
        const { name, city, contact_name_filled_suppliers, contact_name_filled_count, type } = row;
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
                    is_contact_number: true,
                    supplier_type_code: type,
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
      width: '120px',
      formatter: (cell, row) => {
        const {
          contact_name_total_filled_suppliers,
          contact_name_total_filled_count,
          name,
          city,
          type,
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
                    is_multiple_contact_name: true,
                    supplier_type_code: type,
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
          type,
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
                    supplier_type_code: type,
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
        const {
          contact_number_filled_suppliers,
          contact_number_filled_count,
          name,
          city,
          type,
        } = row;
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
                    is_contact_number: true,
                    supplier_type_code: type,
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
      width: '120px',
      formatter: (cell, row) => {
        const {
          contact_number_total_filled_suppliers,
          contact_number_total_filled_count,
          name,
          city,
          type,
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
                    is_multiple_contact_number: true,
                    supplier_type_code: type,
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
          type,
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
                    supplier_type_code: type,
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
