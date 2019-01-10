import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import './index.css';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideChecklistDropdown: true,
      hideLeadsDropdown: true,
      hideEntitiesDropdown: true
    };
    this.toggleChecklistDropdown = this.toggleChecklistDropdown.bind(this);
    this.toggleLeadsDropdown = this.toggleLeadsDropdown.bind(this);
    this.toggleEntitiesDropdown = this.toggleEntitiesDropdown.bind(this);
  }

  toggleChecklistDropdown() {
    this.setState({
      hideChecklistDropdown: !this.state.hideChecklistDropdown
    });
  }

  toggleLeadsDropdown() {
    this.setState({
      hideLeadsDropdown: !this.state.hideLeadsDropdown
    });
  }

  toggleEntitiesDropdown() {
    this.setState({
      hideEntitiesDropdown: !this.state.hideEntitiesDropdown
    });
  }

  render() {
    let { appearance } = this.props;
    return (
      <aside
        className={classnames('sidebar', {
          'sidebar--collapsed': !appearance.isSidebarVisible
        })}
      >
        <div className="sidebar__menu">
          <div className="sidebar__menu__list">
            <ul>
              <li>
                <a href="/#/manageCampaign/create">
                  <i className="fa fa-tasks" aria-hidden="true" />
                  Home
                </a>
              </li>
              <li>
                <a href="/#/manageUser">
                  <i className="fa fa-outdent" aria-hidden="true" />
                  Management
                </a>
              </li>
              <li>
                <a href="/#/OpsDashBoard">
                  <i className="fa fa-dashboard" aria-hidden="true" />
                  OpsDashBoard
                </a>
              </li>
              <li>
                <a href="/#/CampaignList">
                  <i className="fa fa-list" aria-hidden="true" />
                  List Campaigns
                </a>
              </li>
              <li className="dropdown-list-parent">
                <div className="parent-list" onClick={this.toggleLeadsDropdown}>
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Leads
                </div>
                <ul
                  className="dropdown-list-child"
                  hidden={this.state.hideLeadsDropdown}
                >
                  <li>
                    <NavLink to="/#/campaignLeads">
                      <i className="fa fa-columns" aria-hidden="true" />
                      Campaign
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/r/leads/settings">
                      <i className="fa fa-cog" aria-hidden="true" />
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown-list-parent">
                <div
                  className="parent-list"
                  onClick={this.toggleEntitiesDropdown}
                >
                  <i className="fa fa-cubes" aria-hidden="true" />
                  Entities
                </div>
                <ul
                  className="dropdown-list-child"
                  hidden={this.state.hideEntitiesDropdown}
                >
                  <li>
                    <NavLink to="/r/entity/base-type/list">
                      <i className="fa fa-columns" aria-hidden="true" />
                      Base Entity Type
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/r/entity/type/list">
                      <i className="fa fa-columns" aria-hidden="true" />
                      Entity Type
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/r/entity/list">
                      <i className="fa fa-columns" aria-hidden="true" />
                      Entity
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/r/inventory/list">
                  <i className="fa fa-list" aria-hidden="true" />
                  Inventory
                </a>
              </li>
              <li className="dropdown-list-parent">
                <div
                  className="parent-list"
                  onClick={this.toggleChecklistDropdown}
                >
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Checklists
                </div>
                <ul
                  className="dropdown-list-child"
                  hidden={this.state.hideChecklistDropdown}
                >
                  <li>
                    <NavLink to="/r/checklist/campaigns">
                      <i className="fa fa-columns" aria-hidden="true" />
                      Campaign
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/r/checklist/settings/permissions/list">
                      <i className="fa fa-cog" aria-hidden="true" />
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#/dashboard">
                  <i className="fa fa-dashboard" aria-hidden="true" />
                  DashBoard
                </a>
              </li>
              <li>
                <a href="/#/logout">
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    );
  }
}
