import React from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import LoadingWrapper from '../../Error/LoadingWrapper';
import getEntityCitywiseCount from './EntityCitywiseCountGridConfig';

class EntityCitywiseCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityData: [],
      headerValue: '',
      isDataFetched: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.auth;
    const { name, supplier_type } = this.props.location.state;
    const headerValue = `Citywise Report - ${name}`;
    this.setState({ headerValue });
    request
      .get(`${config.API_URL}/v0/ui/ops/supplier-count/${supplier_type}/`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        const { status, data } = resp.body;
        if (status) {
          const entityData = data;
          this.setState({
            entityData,
            isDataFetched: true,
          });
        }
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  }

  render() {
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
              columns={getEntityCitywiseCount()}
              data={this.state.entityData}
              exportCsv={true}
              search={true}
              pagination={true}
              headerValue={this.state.headerValue}
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

export default EntityCitywiseCount;
