const getCampaignSummaryColumn = () => {
  return [
    {
      dataField: 'unknown',
      text: 'Unknown(Others)',
    },
    {
      dataField: 'New Entity',
      text: 'New Entity',
    },
    {
      dataField: 'Not Initiated',
      text: 'Not Initiated',
    },
    {
      dataField: 'Recce',
      text: 'Recce',
    },
    {
      dataField: 'Decision Pending',
      text: 'Decision Pending',
    },
    {
      dataField: 'Rejected',
      text: 'Rejected',
    },
    {
      dataField: 'Tentative Booking',
      text: 'Tentative Booked',
    },
    {
      dataField: 'Confirmed Booking',
      text: 'Confirmed Booked',
    },
    {
      dataField: 'completed',
      text: 'Completed',
    },
  ];
};

export default getCampaignSummaryColumn;
