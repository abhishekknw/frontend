import React from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getEntityCount from './EntityCountGridConfig';
import LoadingWrapper from '../../Error/LoadingWrapper';

class EntityCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityData: [],
      isDataFetched: false,
      isError: false,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    request
      .get(`${config.API_URL}/v0/ui/ops/supplier-summary/`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        const { status, data } = resp.body;
        if (status) {
          const entityData = Object.keys(data).map((key, index) => ({
            ...data[key],
            type: key,
            key: index,
          }));
          this.setState({
            entityData,
            isDataFetched: true,
          });
        }
      })
      .catch((ex) => {
        console.log('Failed to get data');
        this.setState({ isError: true, isDataFetched: true });
      });
  }

  render() {
    return (
      <div style={{ marginTop: '5em' }}>
        {this.state.isDataFetched ? (
          <InnerGrid
            columns={getEntityCount()}
            data={this.state.entityData}
            exportCsv={false}
            search={false}
            pagination={false}
            headerValue="Entity Report"
            backgroundColor="#c7c7c7c9"
          />
        ) : (
          <LoadingWrapper />
        )}
      </div>
    );
  }
}

export default EntityCount;
