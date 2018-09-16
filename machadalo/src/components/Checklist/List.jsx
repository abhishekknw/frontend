import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './index.css';

export default class List extends React.Component {
  constructor() {
    super();

    this.renderCampaignRow = this.renderCampaignRow.bind(this);
  }

  componentDidMount() {
    this.props.getCampaignsList();
  }

  renderCampaignRow(campaign) {
    return (
      <tr key={campaign.id}>
        <td>{campaign.campaign.name}</td>
        <td>
          {moment(campaign.campaign.tentative_start_date).format(
            'Do MMM, YYYY'
          )}
        </td>
        <td>
          {moment(campaign.campaign.tentative_end_date).format('Do MMM, YYYY')}
        </td>
        <td>
          <Link
            to={`/r/checklist/suppliers/${campaign.id}`}
            className="btn btn--danger"
          >
            Select Supplier
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { campaign } = this.props;

    return (
      <div className="list">
        <div className="list__title">
          <h3>Campaign Checklist</h3>
        </div>
        <div className="list__filter">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{campaign.list.map(this.renderCampaignRow)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
