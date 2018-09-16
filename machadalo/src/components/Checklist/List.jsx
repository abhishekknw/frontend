import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

export default class List extends React.Component {
  constructor() {
    super();
  }

  render() {
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
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HDFC Retail Channel</td>
                <td>2018-08-27</td>
                <td>2018-10-30</td>
                <td>
                  <Link to="" className="btn btn--danger">
                    View Checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Create/Edit checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Enter Checklist
                  </Link>
                </td>
              </tr>
              <tr>
                <td>HDFC Retail Channel</td>
                <td>2018-08-28</td>
                <td>2018-10-30</td>
                <td>
                  <Link to="" className="btn btn--danger">
                    View Checklist
                  </Link>
                </td>
                <td>
                  <Link to="/r/checklist/create" className="btn btn--danger">
                    Create/Edit checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Enter Checklist
                  </Link>
                </td>
              </tr>
              <tr>
                <td>HDFC Retail Channel</td>
                <td>2018-08-27</td>
                <td>2018-10-30</td>
                <td>
                  <Link to="" className="btn btn--danger">
                    View Checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Create/Edit checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Enter Checklist
                  </Link>
                </td>
              </tr>
              <tr>
                <td>HDFC Retail Channel</td>
                <td>2018-08-27</td>
                <td>2018-10-30</td>
                <td>
                  <Link to="" className="btn btn--danger">
                    View Checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Create/Edit checklist
                  </Link>
                </td>
                <td>
                  <Link to="" className="btn btn--danger">
                    Enter Checklist
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
