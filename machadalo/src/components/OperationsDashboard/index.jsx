import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
import './index.css';
import DropdownFilterSearchInMenu from '../Filter';
import Loader from '../Loader';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderTappingDashboardList = this.renderTappingDashboardList.bind(this);
    this.state = {
      selected: null,
    };
  }

  componentWillMount() {
    this.props.getTappingDetails();
  }

  renderTappingDashboardList(row, index) {
    return (
      <tr key={row.id}>
        <td>{index + 1}</td>
        <td style={{ cursor: 'pointer' }}>
          <Modal trigger={<Button>{row.name}</Button>}>
            <Modal.Header>{row.name}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>{this.props.supplierTappingDetails.supplierTappingData}</Header>
                <p>Suppliers Modal</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </td>
        <td>{row.campaign_status}</td>
        <td>{row.city}</td>
        <td>{row.supplier_count}</td>
        <td>{row.flat_count_details.filled}</td>
        <td>{row.flat_count_details.not_filled}</td>
        <td>{((row.flat_count_details.filled / row.supplier_count) * 100).toFixed(2)}%</td>
        <td>{row.contact_name.filled}</td>
        <td>{row.contact_name.not_filled}</td>
        <td>{((row.contact_name.filled / row.supplier_count) * 100).toFixed(2)}%</td>
        <td>{row.contact_number.filled}</td>
        <td>{row.contact_number.not_filled}</td>
        <td>{((row.contact_number.filled / row.supplier_count) * 100).toFixed(2)}%</td>
        <td>{row.payment_details.filled}</td>
        <td>{row.payment_details.not_filled}</td>
        <td>{((row.payment_details.filled / row.supplier_count) * 100).toFixed(2)}%</td>
      </tr>
    );
  }

  handleClick = (e, data) => {
    if (data && data.value) {
      this.setState({ selected: data.value });
    }
  };

  renderBody = (
    listData,
    completedCampaigns,
    ongoingCampaings,
    onholdCampaings,
    rejectedCampaings
  ) => {
    switch (this.state.selected) {
      case 'Completed':
        return (
          <tbody>
            {completedCampaigns.length ? (
              completedCampaigns.map(this.renderTappingDashboardList)
            ) : (
              <tr>
                <td colSpan="5">No details available.</td>
              </tr>
            )}
          </tbody>
        );
      case 'Ongoing':
        return (
          <tbody>
            {ongoingCampaings.length ? (
              ongoingCampaings.map(this.renderTappingDashboardList)
            ) : (
              <tr>
                <td colSpan="5">No details available.</td>
              </tr>
            )}
          </tbody>
        );
      case 'On Hold':
        return (
          <tbody>
            {onholdCampaings.length ? (
              onholdCampaings.map(this.renderTappingDashboardList)
            ) : (
              <tr>
                <td colSpan="5">No details available.</td>
              </tr>
            )}
          </tbody>
        );
      case 'Rejected':
        return (
          <tbody>
            {rejectedCampaings.length ? (
              rejectedCampaings.map(this.renderTappingDashboardList)
            ) : (
              <tr>
                <td colSpan="5">No details available.</td>
              </tr>
            )}
          </tbody>
        );
      default:
        return (
          <tbody>
            {listData.length ? (
              listData.map(this.renderTappingDashboardList)
            ) : (
              <tr>
                <td colSpan="5">No details available.</td>
              </tr>
            )}
          </tbody>
        );
    }
  };

  render() {
    const { tappingData } = this.props.tappingDetails;
    const { data } = tappingData;
    const listData = [],
      completedCampaigns = [],
      ongoingCampaings = [],
      onholdCampaings = [],
      rejectedCampaings = [];
    if (data) {
      Object.keys(data).map((key) => {
        listData.push(data[key]);
      });
    }

    if (listData) {
      listData.map((campaing) => {
        if (campaing.campaign_status == 'completed') {
          completedCampaigns.push(campaing);
        } else if (campaing.campaign_status == 'ongoing') {
          ongoingCampaings.push(campaing);
        } else if (campaing.campaign_status == 'on_hold') {
          onholdCampaings.push(campaing);
        } else {
          rejectedCampaings.push(campaing);
        }
      });
    }

    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Operations Dashboard</h3>
        </div>
        <DropdownFilterSearchInMenu onClick={this.handleClick} />
        <div className="list">
          <div className="list__table">
            <table cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name of Campaign</th>
                  <th>Campaign Status</th>
                  <th>City</th>
                  <th>Number of Suppliers</th>
                  <th colspan="3" className="double-column">
                    Flat Count
                  </th>
                  <th colspan="3" className="double-column">
                    Contact Name
                  </th>
                  <th colspan="3" className="double-column">
                    Contact Number
                  </th>
                  <th colspan="3" className="double-column">
                    Payment Details
                  </th>
                </tr>
                <tr>
                  <th />
                  <th />
                  <th />
                  <th />
                  <th />
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>% Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>% Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>% Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>% Filled</th>
                </tr>
              </thead>
              {this.renderBody(
                listData,
                completedCampaigns,
                ongoingCampaings,
                onholdCampaings,
                rejectedCampaings
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
