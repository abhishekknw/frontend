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
        const { society_name } = row;
        return society_name || '-';
      },
    },
    {
      dataField: 'society_address1',
      text: 'Address',
      row: 0,
      rowSpan: 2,
      width: '400px',
      sort: false,
      formatter: (cell, row) => {
        const { society_address1 } = row;
        return society_address1 || '-';
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
    {
      dataField: 'society_latitude',
      text: 'Latitude',
      row: 0,
      rowSpan: 2,
      sort: false,
      formatter: (cell, row) => {
        const { society_latitude } = row;
        return society_latitude || '-';
      },
    },
    {
      dataField: 'society_longitude',
      text: 'Longitude',
      row: 0,
      rowSpan: 2,
      sort: false,
      formatter: (cell, row) => {
        const { society_longitude } = row;
        return society_longitude || '-';
      },
    },
  ];
};

export default getSupplierColumnContactDetails;
