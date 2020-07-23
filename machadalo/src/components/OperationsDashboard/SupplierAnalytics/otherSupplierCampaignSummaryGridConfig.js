import React from 'react';
import { Link } from 'react-router-dom';

const getOtherCampaignSummaryColumn = () => {
  return [
    {
      dataField: 'emergency situation',
      text: 'Emergency Situation',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let emergency_situation = 0;
        emergency_situation = row['emergency situation'];
        let vegetable_and_fruits,
          medicine,
          grocery,
          other_essentials,
          no_requirment = null;
        if (booking_sub_status) {
          vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'] || 0;
          medicine = booking_sub_status['Medicine'] || 0;
          grocery = booking_sub_status['Grocery'] || 0;
          other_essentials = booking_sub_status['Other Essentials'] || 0;
          no_requirment = booking_sub_status['No Requirment'] || 0;
        }
        return (
          <div>
            {emergency_situation}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {vegetable_and_fruits > 0 && `Vegetable and Fruits : ${vegetable_and_fruits}`}
                </p>
                <p>{medicine > 0 && `Medicine : ${medicine}`}</p>
                <p>{grocery > 0 && `Grocery : ${grocery}`}</p>
                <p>{other_essentials > 0 && `Other Essentials : ${other_essentials}`}</p>
                <p>{no_requirment > 0 && `No Requirment : ${no_requirment}`}</p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Complete lockdown',
      text: 'Complete lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let complete_lockdown = 0;
        complete_lockdown = row['Complete lockdown'];
        let vegetable_and_fruits,
          medicine,
          grocery,
          other_essentials,
          no_requirment = null;
        if (booking_sub_status) {
          vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'] || 0;
          medicine = booking_sub_status['Medicine'] || 0;
          grocery = booking_sub_status['Grocery'] || 0;
          other_essentials = booking_sub_status['Other Essentials'] || 0;
          no_requirment = booking_sub_status['No Requirment'] || 0;
        }
        return (
          <div>
            {complete_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {vegetable_and_fruits > 0 && `Vegetable and Fruits : ${vegetable_and_fruits}`}
                </p>
                <p>{medicine > 0 && `Medicine : ${medicine}`}</p>
                <p>{grocery > 0 && `Grocery : ${grocery}`}</p>
                <p>{other_essentials > 0 && `Other Essentials : ${other_essentials}`}</p>
                <p>{no_requirment > 0 && `No Requirment : ${no_requirment}`}</p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Partial building/tower lockdown',
      text: 'Partial building/tower lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let partial_building_lockdown = 0;
        partial_building_lockdown = row['Partial building/tower lockdown'];
        let vegetable_and_fruits,
          medicine,
          grocery,
          other_essentials,
          no_requirment = null;
        if (booking_sub_status) {
          vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'] || 0;
          medicine = booking_sub_status['Medicine'] || 0;
          grocery = booking_sub_status['Grocery'] || 0;
          other_essentials = booking_sub_status['Other Essentials'] || 0;
          no_requirment = booking_sub_status['No Requirment'] || 0;
        }
        return (
          <div>
            {partial_building_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {vegetable_and_fruits > 0 && `Vegetable and Fruits : ${vegetable_and_fruits}`}
                </p>
                <p>{medicine > 0 && `Medicine : ${medicine}`}</p>
                <p>{grocery > 0 && `Grocery : ${grocery}`}</p>
                <p>{other_essentials > 0 && `Other Essentials : ${other_essentials}`}</p>
                <p>{no_requirment > 0 && `No Requirment : ${no_requirment}`}</p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Partial floor lockdown',
      text: 'Partial Floor Lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let partial_floor_lockdown = 0;
        partial_floor_lockdown = row['Partial floor lockdown'];
        let vegetable_and_fruits,
          medicine,
          grocery,
          other_essentials,
          no_requirment = null;
        if (booking_sub_status) {
          vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'] || 0;
          medicine = booking_sub_status['Medicine'] || 0;
          grocery = booking_sub_status['Grocery'] || 0;
          other_essentials = booking_sub_status['Other Essentials'] || 0;
          no_requirment = booking_sub_status['No Requirment'] || 0;
        }
        return (
          <div>
            {partial_floor_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {vegetable_and_fruits > 0 && `Vegetable and Fruits : ${vegetable_and_fruits}`}
                </p>
                <p>{medicine > 0 && `Medicine : ${medicine}`}</p>
                <p>{grocery > 0 && `Grocery : ${grocery}`}</p>
                <p>{other_essentials > 0 && `Other Essentials : ${other_essentials}`}</p>
                <p>{no_requirment > 0 && `No Requirment : ${no_requirment}`}</p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'Partial house/flat lockdown',
      text: 'Partial House/Flat Lockdown',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let partial_house_lockdown = 0;
        partial_house_lockdown = row['Partial house/flat lockdown'];
        let vegetable_and_fruits,
          medicine,
          grocery,
          other_essentials,
          no_requirment = null;
        if (booking_sub_status) {
          vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'] || 0;
          medicine = booking_sub_status['Medicine'] || 0;
          grocery = booking_sub_status['Grocery'] || 0;
          other_essentials = booking_sub_status['Other Essentials'] || 0;
          no_requirment = booking_sub_status['No Requirment'] || 0;
        }
        return (
          <div>
            {partial_house_lockdown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {vegetable_and_fruits > 0 && `Vegetable and Fruits : ${vegetable_and_fruits}`}
                </p>
                <p>{medicine > 0 && `Medicine : ${medicine}`}</p>
                <p>{grocery > 0 && `Grocery : ${grocery}`}</p>
                <p>{other_essentials > 0 && `Other Essentials : ${other_essentials}`}</p>
                <p>{no_requirment > 0 && `No Requirment : ${no_requirment}`}</p>
              </div>
            )}
          </div>
        );
      },
    },

    {
      dataField: 'open',
      text: 'Open',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let open = 0;
        open = row['open'];
        let vegetable_and_fruits,
          medicine,
          grocery,
          other_essentials,
          no_requirment = null;
        if (booking_sub_status) {
          vegetable_and_fruits = booking_sub_status['Vegetable and Fruits'] || 0;
          medicine = booking_sub_status['Medicine'] || 0;
          grocery = booking_sub_status['Grocery'] || 0;
          other_essentials = booking_sub_status['Other Essentials'] || 0;
          no_requirment = booking_sub_status['No Requirment'] || 0;
        }
        return (
          <div>
            {open}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>
                  {vegetable_and_fruits > 0 && `Vegetable and Fruits : ${vegetable_and_fruits}`}
                </p>
                <p>{medicine > 0 && `Medicine : ${medicine}`}</p>
                <p>{grocery > 0 && `Grocery : ${grocery}`}</p>
                <p>{other_essentials > 0 && `Other Essentials : ${other_essentials}`}</p>
                <p>{no_requirment > 0 && `No Requirment : ${no_requirment}`}</p>
              </div>
            )}
          </div>
        );
      },
    },
  ];
};

export default getOtherCampaignSummaryColumn;
