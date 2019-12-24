import { get } from 'lodash';

const addDefaultValues = (row, value) => {
  let substatusValue = get(row, value);
  if (!substatusValue) {
    substatusValue = 0;
  }
  return substatusValue;
};

const getBookingSubStatusColumn = () => {
  return [
    {
      dataField: 'Phone Number Issue',
      text: 'Phone Number Issue',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Phone Number Issue');
      },
    },
    {
      dataField: 'Contact Person Issue',
      text: 'Contact Person Issue',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Contact Person Issue');
      },
    },
    {
      dataField: 'Recce Required',
      text: 'Recce Required',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Recce Required');
      },
    },
    {
      dataField: 'Visit Required',
      text: 'Visit Required',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Visit Required');
      },
    },
    {
      dataField: 'Call Required',
      text: 'Call Required',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Call Required');
      },
    },
    {
      dataField: 'Negotiation Required',
      text: 'Negotiation Required',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Negotiation Required');
      },
    },
    {
      dataField: 'Not Available',
      text: 'Not Available',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Not Available');
      },
    },
    {
      dataField: 'Postponed',
      text: 'Postponed',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Postponed');
      },
    },
    {
      dataField: 'Specific Occasion Only',
      text: 'Specific Occasion Only',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Specific Occasion Only');
      },
    },
    {
      dataField: 'Less occupancy',
      text: 'Less occupancy',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Less occupancy');
      },
    },
    {
      dataField: 'Less Children',
      text: 'Less Children',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Less Children');
      },
    },
    {
      dataField: 'Under Builder',
      text: 'Under Builder',
      row: 1,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Under Builder');
      },
    },
    {
      dataField: 'Recce Approved',
      text: 'Recce Approved',
      row: 1,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Recce Approved');
      },
    },
    {
      dataField: 'Visit Required',
      text: 'Visit Required',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Visit Required');
      },
    },
    {
      dataField: 'Call Required',
      text: 'Call Required',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Call Required');
      },
    },
    {
      dataField: 'Very Expensive',
      text: 'Very Expensive',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Very Expensive');
      },
    },
    {
      dataField: 'Client Rejected',
      text: 'Client Rejected',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Client Rejected');
      },
    },
    {
      dataField: 'Rejected by Society',
      text: 'Rejected by Society',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Rejected by Society');
      },
    },
    {
      dataField: 'Phone Booking',
      text: 'Phone Booking',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Phone Booking');
      },
    },
    {
      dataField: 'Visit Booking',
      text: 'Visit Booking',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Visit Booking');
      },
    },
    {
      dataField: 'Wikimapia',
      text: 'Wikimapia',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Wikimapia');
      },
    },
    {
      dataField: 'Google',
      text: 'Google',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Google');
      },
    },
    {
      dataField: '99Acres',
      text: '99Acres',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, '99Acres');
      },
    },
    {
      dataField: 'Magic Brick',
      text: 'Magic Brick',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Magic Brick');
      },
    },
    {
      dataField: 'First Time Assigned',
      text: 'First Time Assigned',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'First Time Assigned');
      },
    },
    {
      dataField: 'Others(Specify)',
      text: 'Others(Specify)',
      row: 0,
      rowSpan: 2,
      formatter: (cell, row) => {
        return addDefaultValues(row, 'Others(Specify)');
      },
    },
  ];
};

export default getBookingSubStatusColumn;
