import React from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getEntityCount from './EntityCountGridConfig';

class EntityCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityData: [],
    };
  }

  componentDidMount() {
    const { token } = this.props;
    request
      .get(`${config.API_URL}/v0/ui/suppliers-meta/`)
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
          });
        }
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  }

  render() {
    return (
      <div style={{ marginTop: '5em' }}>
        {this.state.entityData.length > 0 && (
          <InnerGrid
            columns={getEntityCount()}
            data={this.state.entityData}
            exportCsv={false}
            search={false}
            pagination={false}
            headerValue="Entity Report"
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default EntityCount;
