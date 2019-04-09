import React from 'react';

import Campaigns from './../Campaign';

export default function BookingCampaigns(props) {
  const actions = [
    {
      href: `/r/booking/edit`,
      buttonLabel: 'Edit Booking',
      headerLabel: 'Action'
    }
  ];

  return <Campaigns {...props} actions={actions} />;
}
