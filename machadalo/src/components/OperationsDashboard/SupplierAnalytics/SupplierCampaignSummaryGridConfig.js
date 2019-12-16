const getCampaignSummaryColumn = () => {
  return [
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
      dataField: 'Not Booked',
      text: 'Not Booked',
    },
    {
      dataField: 'Phone Booked',
      text: 'Phone Booked',
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
      dataField: 'Visit Booked',
      text: 'Visit Booked',
    },
    {
      dataField: 'completed',
      text: 'Completed',
    },
  ];
};

export default getCampaignSummaryColumn;
