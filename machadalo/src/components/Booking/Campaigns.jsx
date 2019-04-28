import React from 'react';

import Campaigns from './../Campaign';

export default function BookingCampaigns(props) {
  console.log('props: ', props);
  const actions = [
    {
      href: `/r/booking/list`,
      buttonLabel: 'View Bookings',
      headerLabel: 'Action',
    },
  ];

  return <Campaigns {...props} actions={actions} />;
}
