import React, { Component } from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getEntityList from './EntityListGridConfig';
import LoadingWrapper from '../../Error/LoadingWrapper';

class EntityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierType: '',
      entityDetails: [],
      isDataFetched: false,
      isError: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.auth;
    const { supplier_type, city } = this.props.location.state;
    this.setState({ supplierType: supplier_type });
    request
      .get(`${config.API_URL}/v0/ui/ops/supplier-list/${supplier_type}/?city=${city}`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        let entityDetails = resp.body.data;
        if (entityDetails.length > 0)
          entityDetails.forEach((entity) => (entity.supplierTypeCode = supplier_type));
        this.setState({
          entityDetails,
          isDataFetched: true,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data');
        this.setState({ isError: true, isDataFetched: true });
      });
  }

  render() {
    const { city, name } = this.props.location.state;
    const heading = `List of ${name} Entities of ${city}`;
    return (
      <div className="bootstrap-iso">
        {this.state.isDataFetched ? (
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.props.history.push(`/r/operations-dashboard/entity`)}
              style={{ marginTop: '10px', float: 'right', backgroundColor: 'rgb(232, 68, 120)' }}
            >
              <i className="fa fa-arrow-left" aria-hidden="true" />
              &nbsp; Back
            </button>
            <InnerGrid
              columns={getEntityList(this.state.entityDetails)}
              data={this.state.entityDetails}
              exportCsv={true}
              search={true}
              pagination={true}
              headerValue={heading}
              backgroundColor="#c7c7c7c9"
            />
          </div>
        ) : (
          <LoadingWrapper />
        )}
      </div>
    );
  }
}

export default EntityList;
