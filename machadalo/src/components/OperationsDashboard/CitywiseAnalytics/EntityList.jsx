import React, { Component } from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getEntityList from './EntityListGridConfig';

class EntityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entityDetails: [],
    };
  }

  componentDidMount() {
    const { token } = this.props.auth;
    const { supplier_type, city } = this.props.location.state;
    request
      .get(`${config.API_URL}/v0/ui/ops/supplier-list/${supplier_type}/?city=${city}`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        this.setState({
          entityDetails: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  }

  render() {
    console.log(this.props.location.state);
    const { city, name, supplier_type } = this.props.location.state;
    const heading = `List of ${name} Entities of ${city}`;
    return (
      <div>
        {/* <button
          type="button"
          className="btn btn--danger"
          onClick={() => this.props.history.push(`/r/operations-dashboard/city/${supplier_type}/`)}
          style={{ marginTop: '10px' }}
        >
        <i className="fa fa-arrow-left" aria-hidden="true" />
        &nbsp; Back
        </button> */}
        {this.state.entityDetails.length > 0 && (
          <InnerGrid
            columns={getEntityList()}
            data={this.state.entityDetails}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue={heading}
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default EntityList;
