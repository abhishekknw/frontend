import React from 'react';
import { Link } from 'react-router-dom';

const getOtherCampaignStatus = (booking_sub_status, booking_status) => {
  let vegetable_and_fruits,
    medicine,
    grocery,
    other_essentials,
    no_requirment = null;

  if (
    booking_sub_status['Vegetable and Fruits'] &&
    booking_sub_status['Vegetable and Fruits'][booking_status]
  ) {
    vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'][booking_status].count;
  }
  if (booking_sub_status['Medicine'] && booking_sub_status['Medicine'][booking_status]) {
    medicine = booking_sub_status['Medicine'][booking_status].count;
  }
  if (booking_sub_status['Grocery'] && booking_sub_status['Grocery'][booking_status]) {
    grocery = booking_sub_status['Grocery'][booking_status].count;
  }
  if (
    booking_sub_status['Other Essentials'] &&
    booking_sub_status['Other Essentials'][booking_status]
  ) {
    other_essentials = booking_sub_status['Other Essentials'][booking_status].count;
  }
  if (booking_sub_status['No Requirment'] && booking_sub_status['No Requirment'][booking_status]) {
    no_requirment = booking_sub_status['No Requirment'][booking_status].count;
  }

  return {
    vegetable_and_fruits,
    medicine,
    grocery,
    other_essentials,
    no_requirment,
  };
};

const getOtherCampaignSummaryColumn = () => {
  return [
    {
      dataField: 'Emergency Situation',
      text: 'Emergency Situation',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let emergency_situation = row['Emergency Situation'] || 0;

        let substatusCountObject = {
          vegetable_and_fruits: 0,
          medicine: 0,
          grocery: 0,
          other_essentials: 0,
          no_requirment: 0,
        };

        if (booking_sub_status) {
          substatusCountObject = getOtherCampaignStatus(booking_sub_status, 'Emergency Situation');
        }
        return (
          <div>
            {emergency_situation}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {substatusCountObject.vegetable_and_fruits > 0 &&
                    `Vegetable and Fruits : ${substatusCountObject.vegetable_and_fruits}`}
                </p>
                <p>
                  {substatusCountObject.medicine > 0 &&
                    `Medicine : ${substatusCountObject.medicine}`}
                </p>
                <p>
                  {substatusCountObject.grocery > 0 && `Grocery : ${substatusCountObject.grocery}`}
                </p>
                <p>
                  {substatusCountObject.other_essentials > 0 &&
                    `Other Essentials : ${substatusCountObject.other_essentials}`}
                </p>
                <p>
                  {substatusCountObject.no_requirment > 0 &&
                    `No Requirment : ${substatusCountObject.no_requirment}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Complete Lockdown',
      text: 'Complete Lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let complete_lockdown = row['Complete Lockdown'] || 0;

        let substatusCountObject = {
          vegetable_and_fruits: 0,
          medicine: 0,
          grocery: 0,
          other_essentials: 0,
          no_requirment: 0,
        };

        if (booking_sub_status) {
          substatusCountObject = getOtherCampaignStatus(booking_sub_status, 'Complete Lockdown');
        }
        return (
          <div>
            {complete_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {substatusCountObject.vegetable_and_fruits > 0 &&
                    `Vegetable and Fruits : ${substatusCountObject.vegetable_and_fruits}`}
                </p>
                <p>
                  {substatusCountObject.medicine > 0 &&
                    `Medicine : ${substatusCountObject.medicine}`}
                </p>
                <p>
                  {substatusCountObject.grocery > 0 && `Grocery : ${substatusCountObject.grocery}`}
                </p>
                <p>
                  {substatusCountObject.other_essentials > 0 &&
                    `Other Essentials : ${substatusCountObject.other_essentials}`}
                </p>
                <p>
                  {substatusCountObject.no_requirment > 0 &&
                    `No Requirment : ${substatusCountObject.no_requirment}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Partial Building/Tower Lockdown',
      text: 'Partial Building/Tower Lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let partial_building_lockdown = row['Partial Building/Tower Lockdown'] || 0;

        let substatusCountObject = {
          vegetable_and_fruits: 0,
          medicine: 0,
          grocery: 0,
          other_essentials: 0,
          no_requirment: 0,
        };

        if (booking_sub_status) {
          substatusCountObject = getOtherCampaignStatus(
            booking_sub_status,
            'Partial Building/Tower Lockdown'
          );
        }
        return (
          <div>
            {partial_building_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {substatusCountObject.vegetable_and_fruits > 0 &&
                    `Vegetable and Fruits : ${substatusCountObject.vegetable_and_fruits}`}
                </p>
                <p>
                  {substatusCountObject.medicine > 0 &&
                    `Medicine : ${substatusCountObject.medicine}`}
                </p>
                <p>
                  {substatusCountObject.grocery > 0 && `Grocery : ${substatusCountObject.grocery}`}
                </p>
                <p>
                  {substatusCountObject.other_essentials > 0 &&
                    `Other Essentials : ${substatusCountObject.other_essentials}`}
                </p>
                <p>
                  {substatusCountObject.no_requirment > 0 &&
                    `No Requirment : ${substatusCountObject.no_requirment}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Partial Floor Lockdown',
      text: 'Partial Floor Lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let partial_floor_lockdown = row['Partial Floor Lockdown'] || 0;

        let substatusCountObject = {
          vegetable_and_fruits: 0,
          medicine: 0,
          grocery: 0,
          other_essentials: 0,
          no_requirment: 0,
        };

        if (booking_sub_status) {
          substatusCountObject = getOtherCampaignStatus(
            booking_sub_status,
            'Partial Floor Lockdown'
          );
        }
        return (
          <div>
            {partial_floor_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {substatusCountObject.vegetable_and_fruits > 0 &&
                    `Vegetable and Fruits : ${substatusCountObject.vegetable_and_fruits}`}
                </p>
                <p>
                  {substatusCountObject.medicine > 0 &&
                    `Medicine : ${substatusCountObject.medicine}`}
                </p>
                <p>
                  {substatusCountObject.grocery > 0 && `Grocery : ${substatusCountObject.grocery}`}
                </p>
                <p>
                  {substatusCountObject.other_essentials > 0 &&
                    `Other Essentials : ${substatusCountObject.other_essentials}`}
                </p>
                <p>
                  {substatusCountObject.no_requirment > 0 &&
                    `No Requirment : ${substatusCountObject.no_requirment}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Partial House/Flat Lockdown',
      text: 'Partial House/Flat Lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let partial_house_lockdown = row['Partial House/Flat Lockdown'] || 0;

        let substatusCountObject = {
          vegetable_and_fruits: 0,
          medicine: 0,
          grocery: 0,
          other_essentials: 0,
          no_requirment: 0,
        };

        if (booking_sub_status) {
          substatusCountObject = getOtherCampaignStatus(
            booking_sub_status,
            'Partial House/Flat Lockdown'
          );
        }
        return (
          <div>
            {partial_house_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {substatusCountObject.vegetable_and_fruits > 0 &&
                    `Vegetable and Fruits : ${substatusCountObject.vegetable_and_fruits}`}
                </p>
                <p>
                  {substatusCountObject.medicine > 0 &&
                    `Medicine : ${substatusCountObject.medicine}`}
                </p>
                <p>
                  {substatusCountObject.grocery > 0 && `Grocery : ${substatusCountObject.grocery}`}
                </p>
                <p>
                  {substatusCountObject.other_essentials > 0 &&
                    `Other Essentials : ${substatusCountObject.other_essentials}`}
                </p>
                <p>
                  {substatusCountObject.no_requirment > 0 &&
                    `No Requirment : ${substatusCountObject.no_requirment}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'OPEN',
      text: 'OPEN',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let open = row['OPEN'] || 0;

        let substatusCountObject = {
          vegetable_and_fruits: 0,
          medicine: 0,
          grocery: 0,
          other_essentials: 0,
          no_requirment: 0,
        };

        if (booking_sub_status) {
          substatusCountObject = getOtherCampaignStatus(booking_sub_status, 'OPEN');
        }
        return (
          <div>
            {open}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {substatusCountObject.vegetable_and_fruits > 0 &&
                    `Vegetable and Fruits : ${substatusCountObject.vegetable_and_fruits}`}
                </p>
                <p>
                  {substatusCountObject.medicine > 0 &&
                    `Medicine : ${substatusCountObject.medicine}`}
                </p>
                <p>
                  {substatusCountObject.grocery > 0 && `Grocery : ${substatusCountObject.grocery}`}
                </p>
                <p>
                  {substatusCountObject.other_essentials > 0 &&
                    `Other Essentials : ${substatusCountObject.other_essentials}`}
                </p>
                <p>
                  {substatusCountObject.no_requirment > 0 &&
                    `No Requirment : ${substatusCountObject.no_requirment}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },
  ];
};

export default getOtherCampaignSummaryColumn;
