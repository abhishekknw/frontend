import React from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getEntityCount from './EntityCountGridConfig';
import LoadingWrapper from '../../Error/LoadingWrapper';
import { SupplierListData } from '../../../Dashboards/_actions/testingJsonData';
import TableHeader from '../../../Dashboards/Table/TableHeader/TableHeader';
import Table from 'react-bootstrap/Table';
import '../../../Dashboards/Table/React-Bootstrap-table/react-bootstrap-table.css';
import { Link } from 'react-router-dom';

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
      <div style={{ marginTop: '1em' }}>
        <TableHeader headerValue="Entity Report" />
        {this.state.isDataFetched ? (
          <>
            {/* <InnerGrid
              columns={getEntityCount()}
              data={this.state.entityData}
              exportCsv={false}
              search={false}
              pagination={false}
              headerValue="Entity Report"
              backgroundColor="#c7c7c7c9"
            /> */}
            <Table responsive className={`react-bootstrap-custom-table v-middle`}>
              <thead>
                <tr>
                  <th rowspan="2">Entity Type</th>
                  <th rowspan="2">Entity Count</th>
                  <th rowspan="2">Company</th>
                  <th colspan="3">Contact Name</th>
                  <th colspan="3">Contact Number</th>
                </tr>
                <tr>
                  <th>Filled(Unique)</th>
                  <th>Total Filled</th>
                  <th>Not Filled</th>
                  <th>Filled(Unique)</th>
                  <th>Total Filled</th>
                  <th>Not Filled</th>
                </tr>
              </thead>
              <tbody id="rows">
                {SupplierListData?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item.count > 0 ? (
                          <Link
                            style={{ color: '#3e59e3' }}
                            to={{
                              pathname: `city/${item?.supplier_type}/`,
                              state: {
                                supplier_type: item?.supplier_type,
                                // name,
                              },
                            }}
                          >
                            {' '}
                            {item.supplier_type}
                          </Link>
                        ) : (
                          item.supplier_type
                        )}
                      </td>
                      <td>{item.count}</td>
                      <td>{item.company}</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          <LoadingWrapper />
        )}
      </div>
    );
  }
}

export default EntityCount;
