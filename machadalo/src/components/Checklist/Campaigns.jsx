import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './index.css';

export default class Campaigns extends React.Component {
  constructor() {
    super();

    this.state = {
      searchFilter: ''
    };

    this.renderCampaignRow = this.renderCampaignRow.bind(this);
    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.getFilteredList = this.getFilteredList.bind(this);
  }

  componentDidMount() {
    this.props.getCampaignsList();
  }

  onSearchFilterChange(event) {
    this.setState({
      searchFilter: event.target.value
    });
  }

  getFilteredList(list) {
    return list.filter(
      item =>
        item.campaign.name
          .toLowerCase()
          .replace(/[^0-9a-z]/gi, '')
          .indexOf(
            this.state.searchFilter.toLowerCase().replace(/[^0-9a-z]/gi, '')
          ) !== -1
    );
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
            to={`/r/checklist/suppliers/${campaign.campaign.proposal_id}`}
            className="btn btn--danger"
          >
            Select Supplier
          </Link>
        </td>
        <td>
          <Link
            to={`/r/checklist/list/${campaign.campaign.proposal_id}`}
            className="btn btn--danger"
          >
            View Checklists
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { campaign } = this.props;

    const filteredList = this.getFilteredList(campaign.list);

    return (
      <div className="list">
        <div className="list__title">
          <h3>Campaign Checklist</h3>
        </div>
        <div className="list__filter">
          <input
            type="text"
            placeholder="Search..."
            onChange={this.onSearchFilterChange}
            value={this.state.searchFilter}
          />
        </div>
        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
                <th>Checklist</th>
              </tr>
            </thead>
            <tbody>{filteredList.map(this.renderCampaignRow)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
