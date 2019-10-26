const getCampaignColumn = () => {
  return [
    {
      dataField: 'name',
      text: 'Name',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'locality',
      text: 'Locality',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'subarea',
      text: 'Subarea',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'city',
      text: 'City',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'society_quality',
      text: 'Supplier Quality',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'society_quantity',
      text: 'Supplier Quantity',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'payment_method',
      text: 'Payment Method',
      row: 0,
      rowSpan: 2,
    },
    {
      dataField: 'comments_count',
      text: 'Comments Count',
      row: 0,
      rowSpan: 2,
    },
  ];
};

export default getCampaignColumn;
