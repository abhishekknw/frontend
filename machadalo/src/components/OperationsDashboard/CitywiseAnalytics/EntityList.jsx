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
      entityDetails: [],
      isDataFetched: false,
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
          isDataFetched: true,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  }

  render() {
    const { city, name } = this.props.location.state;
    const heading = `List of ${name} Entities of ${city}`;
    return (
      <div className="bootstrap-iso">
        {this.state.isDataFetched ? (
          <InnerGrid
            columns={getEntityList()}
            data={this.state.entityDetails}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue={heading}
            backgroundColor="#c7c7c7c9"
          />
        ) : (
          <LoadingWrapper />
        )}
      </div>
    );
  }
}

export default EntityList;
