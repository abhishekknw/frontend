import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './index.css';

export default class Campaigns extends React.Component {
  constructor() {
    super();

    this.state = {
      searchFilter: '',
    };

    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.getFilteredList = this.getFilteredList.bind(this);
    this.renderCampaignRow = this.renderCampaignRow.bind(this);
  }

  componentDidMount() {
    this.props.getCampaignsList();
  }

  onSearchFilterChange(event) {
    this.setState({
      searchFilter: event.target.value,
    });
  }

  getFilteredList(list) {
    return list.filter(
      (item) =>
        item.campaign.name
          .toLowerCase()
          .replace(/[^0-9a-z]/gi, '')
          .indexOf(this.state.searchFilter.toLowerCase().replace(/[^0-9a-z]/gi, '')) !== -1
    );
  }

  renderCampaignRow(campaign) {
    const { actions } = this.props;

    return (
      <tr key={campaign.id}>
        <td>{campaign.campaign.name}</td>
        <td>{moment(campaign.campaign.tentative_start_date).format('Do MMM, YYYY')}</td>
        <td>{moment(campaign.campaign.tentative_end_date).format('Do MMM, YYYY')}</td>
        <td>
          {actions.map((item, index) => {
            return (
              <Link
                key={index}
                to={`${item.href}/${campaign.campaign.proposal_id}`}
                className="btn btn--danger"
              >
                {item.buttonLabel}
              </Link>
            );
          })}
        </td>
      </tr>
    );
  }

  render() {
    const { searchFilter } = this.state;
    const { campaign, actions } = this.props;
    const list = this.getFilteredList(campaign.list);

    return (
      <div className="campaign">
        <div className="list">
          <div className="list__title">
            <h3>Campaigns</h3>
          </div>
          <div className="list__filter">
            <input
              type="text"
              placeholder="Search..."
              value={searchFilter}
              onChange={this.onSearchFilterChange}
            />
          </div>
          <div className="list__table">
            <table cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  {actions.map((item, index) => (
                    <th key={index}>{item.headerLabel}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{list.map(this.renderCampaignRow)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
