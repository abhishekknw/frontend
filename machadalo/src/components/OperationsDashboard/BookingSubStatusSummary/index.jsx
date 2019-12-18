import React from 'react';
import '../../bootstrap-iso.css';
import getBookingSubStatusColumn from './BookingSubStatusGridColumnConfig';
import InnerGrid from '../../InnerGrid';

class BookingSubStatusSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bootstrap-iso">
        {this.props.bookingSubStatusDetails && (
          <div style={{ marginTop: '10px' }}>
            <h5 style={{ color: 'white' }}>Booking Sub Status Summary</h5>
            <InnerGrid
              columns={getBookingSubStatusColumn()}
              data={[this.props.bookingSubStatusDetails]}
              backgroundColor="white"
              exportCsv={false}
              search={false}
              pagination={false}
              styles={{ backgroundColor: 'white' }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default BookingSubStatusSummary;
