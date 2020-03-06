import React from 'react';
import { Link } from 'react-router-dom';

const getCampaignSummaryColumn = () => {
  return [
    {
      dataField: 'unknown',
      text: 'Unknown(Others)',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let unknown = 0;
        unknown = row['unknown'];
        let phone_number_issue,
          contact_person_issue = null;
        if (booking_sub_status) {
          phone_number_issue = booking_sub_status['Phone Number Issue'] || 0;
          contact_person_issue = booking_sub_status['Contact Person Issue'] || 0;
        }
        return (
          <div>
            {unknown}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>{phone_number_issue > 0 && `Phone Number Issue : ${phone_number_issue}`}</p>
                <p>
                  {contact_person_issue > 0 && `Contact Person Issue : ${contact_person_issue}`}
                </p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      dataField: 'New Entity',
      text: 'New Entity',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let new_entity = 0;
        new_entity = row['New Entity'];
        let wikimapia,
          google,
          acres,
          magic_brick,
          first_time_assigned,
          others = null;
        if (booking_sub_status) {
          wikimapia = booking_sub_status['Wikimapia'] || 0;
          google = booking_sub_status['Google'] || 0;
          acres = booking_sub_status['99Acres'] || 0;
          magic_brick = booking_sub_status['Magic Brick'] || 0;
          first_time_assigned = booking_sub_status['First Time Assigned'] || 0;
          others = booking_sub_status['NE Others'] || 0;
        }
        return (
          <div>
            {new_entity}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>{wikimapia > 0 && `Wikimapia : ${wikimapia}`}</p>
                <p>{google > 0 && `Google : ${google}`}</p>
                <p>{acres > 0 && `99 Acres : ${acres}`}</p>
                <p>{magic_brick > 0 && `Magic Brick : ${magic_brick}`}</p>
                <p>{first_time_assigned > 0 && `First Time Assigned : ${first_time_assigned}`}</p>
                <p>{others > 0 && `Others : ${others}`}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      dataField: 'Not Initiated',
      text: 'Not Initiated',
    },
    {
      dataField: 'Recce',
      text: 'Recce',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let recce = 0;
        recce = row['Recce'];
        let recce_required,
          recce_approved = null;
        if (booking_sub_status) {
          recce_required = booking_sub_status['Recce Required'] || 0;
          recce_approved = booking_sub_status['Recce Approved'] || 0;
        }
        return (
          <div>
            {recce}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>{recce_approved > 0 && `Recce Approved : ${recce_approved}`}</p>
                <p>{recce_required > 0 && `Recce Required : ${recce_required}`}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      dataField: 'Decision Pending',
      text: 'Decision Pending',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let decision_pending = 0;
        decision_pending = row['Decision Pending'];
        let visit_required,
          call_required,
          negotiation_required,
          not_available,
          postponed,
          specific_occasion_only,
          others = null;
        if (booking_sub_status) {
          visit_required = booking_sub_status['Visit Required'] || 0;
          call_required = booking_sub_status['Call Required'] || 0;
          negotiation_required = booking_sub_status['Negotiation Required'] || 0;
          not_available = booking_sub_status['Not Available'] || 0;
          postponed = booking_sub_status['Postponed'] || 0;
          specific_occasion_only = booking_sub_status['Specific Occasion Only'] || 0;
          others = booking_sub_status['DP Others'] || 0;
        }
        return (
          <div>
            {decision_pending}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>{visit_required > 0 && `Visit Required : ${visit_required}`}</p>
                <p>{call_required > 0 && `Call Required : ${call_required}`}</p>
                <p>
                  {negotiation_required > 0 && `Negotiation Required : ${negotiation_required}`}
                </p>
                <p>{not_available > 0 && `Not Available : ${not_available}`}</p>
                <p>{postponed > 0 && `Postponed : ${postponed}`}</p>
                <p>
                  {specific_occasion_only > 0 &&
                    `specific_occasion_only: ${specific_occasion_only}`}
                </p>
                <p>{others > 0 && `Others : ${others}`}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      dataField: 'Rejected',
      text: 'Rejected',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let rejected = 0;
        rejected = row['Rejected'];
        let less_occupancy,
          less_children,
          under_builder,
          very_expensive,
          client_rejected,
          rejected_by_society,
          others = null;
        if (booking_sub_status) {
          less_occupancy = booking_sub_status['Less occupancy'] || 0;
          less_children = booking_sub_status['Less Children'] || 0;
          under_builder = booking_sub_status['Under Builder'] || 0;
          very_expensive = booking_sub_status['Very Expensive'] || 0;
          client_rejected = booking_sub_status['Client Rejected'] || 0;
          rejected_by_society = booking_sub_status['Rejected by Society'] || 0;
          others = booking_sub_status['Rejected Others'] || 0;
        }
        return (
          <div>
            {rejected}{' '}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>{less_occupancy > 0 && `Less Occupancy : ${less_occupancy}`}</p>
                <p>{less_children > 0 && `Less Children : ${less_children}`}</p>
                <p>{under_builder > 0 && `Under Builder : ${under_builder}`}</p>
                <p>{very_expensive > 0 && `Very Expensive : ${very_expensive}`}</p>
                <p>{client_rejected > 0 && `Client Rejected : ${client_rejected}`}</p>
                <p>{rejected_by_society > 0 && `Rejected By Society : ${rejected_by_society}`}</p>
                <p>{others > 0 && `Others : ${others}`}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      dataField: 'Tentative Booking',
      text: 'Tentative Booked',
      formatter: (cell, row) => {
        const { booking_sub_status } = row;
        let tentative_booking = 0;
        tentative_booking = row['Tentative Booking'];
        let phone_booking,
          visit_booking = null;
        if (booking_sub_status) {
          phone_booking = booking_sub_status['Phone Booking'] || 0;
          visit_booking = booking_sub_status['Visit Booking'] || 0;
        }
        return (
          <div>
            {tentative_booking}
            {booking_sub_status && (
              <div style={{ color: 'green' }}>
                <p>{phone_booking > 0 && `Phone Booking : ${phone_booking}`}</p>
                <p>{visit_booking > 0 && `Visit Booking : ${visit_booking}`}</p>
              </div>
            )}
          </div>
        );
      },
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
