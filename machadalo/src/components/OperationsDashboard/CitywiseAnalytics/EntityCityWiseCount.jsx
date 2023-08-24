import React from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import LoadingWrapper from '../../Error/LoadingWrapper';
import getEntityCitywiseCount from './EntityCitywiseCountGridConfig';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import TableHeader from '../../../Dashboards/Table/TableHeader/TableHeader';

class EntityCitywiseCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityData: [],
      headerValue: '',
      isDataFetched: false,
      isError: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.auth;
    const { name, supplier_type } = this.props.location.state;
    const headerValue = `Citywise Report - ${name}`;
    this.setState({ headerValue });
    request
      // .get(`${config.API_URL}/v0/ui/ops/supplier-count/${supplier_type}/`)
      .get(
        `${config.API_URL}/v0/ui/ops/get-supplier-summary-city-wise/?supplier_type=${supplier_type}`
      )
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        const { status, data } = resp.body;
        if (status) {
          const entityData = Object.keys(data).map((key, index) => ({
            ...data[key],
            // city: key,
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
      <div className="bootstrap-iso">
        <TableHeader headerValue={this.state.headerValue} />

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
            {/* <InnerGrid
              columns={getEntityCitywiseCount()}
              data={this.state.entityData}
              exportCsv={false}
              search={true}
              pagination={true}
              headerValue={this.state.headerValue}
              backgroundColor="#c7c7c7c9"
            /> */}
            <Table responsive className={`react-bootstrap-custom-table v-middle`}>
              <thead>
                <tr>
                  <th rowSpan="2">City</th>
                  <th rowSpan="2">Count</th>
                  <th colSpan="3">Contact Name</th>
                  <th colSpan="3">Contact Number</th>
                  <th colSpan="3">Contact Number(Decision Maker)</th>
                  <th colSpan="4">Entity Count</th>
                </tr>
                <tr>
                  <th>Filled(Unique)</th>
                  <th>Total Filled</th>
                  <th>Not Filled</th>
                  <th>Filled(Unique)</th>
                  <th>Total Filled</th>
                  <th>Not Filled</th>
                  <th>Filled(Unique)</th>
                  <th>Total Filled</th>
                  <th>Not Filled</th>
                  <th>Today's Count(% inc from yesterday)</th>
                  <th>This Week Count(% inc from last week)</th>
                  <th>This Month Count(% inc from last month)</th>
                  <th>Last 3 Months Count</th>
                </tr>
              </thead>
              <tbody id="rows">
                {this.state.entityData?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.city}</td>
                      <td>
                        {item?.count && item?.count > 0 ? (
                          <Link
                            style={{ color: '#3e59e3' }}
                            to={{
                              pathname: `?city=${item?.city}`,
                              state: {
                                supplier_type: item?.supplier_type,
                                // city,
                              },
                            }}
                          >
                            {item?.count}
                          </Link>
                        ) : (
                          0
                        )}
                      </td>
                      <td colSpan={13}>Comming Soon</td>
                      {/* <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td>
                      <td>Comming Soon</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <LoadingWrapper />
        )}
      </div>
    );
  }
}

export default EntityCitywiseCount;
