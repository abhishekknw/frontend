import React from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import LoadingWrapper from '../../Error/LoadingWrapper';
import getEntityCitywiseCount from './EntityCitywiseCountGridConfig';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import TableHeader from '../../../Dashboards/Table/TableHeader/TableHeader';
import ReactPagination from '../../../Dashboards/Pagination/Pagination';
import { sortingTableData } from '../../../Dashboards/_actions/sorting.action';
import { Integer } from 'read-excel-file';
class EntityCitywiseCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityData: [],
      headerValue: '',
      isDataFetched: false,
      isError: false,
      sortingKey: '',
      sortReverse: false,
      pagination: { page: 1, startIndex: 0, endIndex: 10 },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
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
  handlePageChange(event) {
    let page = event.selected;
    let start = page * 10;
    let end = start + 10;
    let obj = { page: page, startIndex: start, endIndex: end };
    this.setState((prevState) => ({
      pagination: obj,
    }));
  }
  sortingData(tableData, accessKey, reverse, type) {
    let newList = sortingTableData(tableData, accessKey, reverse, type);
    this.setState((prevState) => ({
      sortReverse: !this.state.sortReverse,
      sortingKey: accessKey,
    }));
    this.setState((prevState) => ({
      entityData: newList,
    }));
  }

  render() {
    return (
      // <div className="bootstrap-iso">
      <div>
        <TableHeader headerValue={this.state.headerValue} />

        {this.state.isDataFetched ? (
          <div>
            <div style={{ width: '100%' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.history.push(`/r/operations-dashboard/entity`)}
                // style={{ marginTop: '0px' }}
              >
                <i className="fa fa-arrow-left" aria-hidden="true" />
                &nbsp; Back
              </button>
            </div>
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
                '{' '}
                <tr style={({ padding: '8px 14px' }, { whiteSpace: 'nowrap' })}>
                  <th
                    rowSpan="2"
                    className={`sortable ${
                      this.state.sortingKey == 'city'
                        ? `${this.state.sortReverse ? 'asc' : 'desc'}`
                        : ''
                    }`}
                    onClick={(e) => {
                      this.sortingData(this.state.entityData, 'city', this.state.sortReverse);
                    }}
                  >
                    City
                  </th>
                  <th
                    rowSpan="2"
                    className={`sortable ${
                      this.state.sortingKey == 'count'
                        ? `${this.state.sortReverse ? 'asc' : 'desc'}`
                        : ''
                    }`}
                    onClick={(e) => {
                      this.sortingData(
                        this.state.entityData,
                        'count',
                        this.state.sortReverse,
                        'Number'
                      );
                    }}
                  >
                    Count
                  </th>
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
                {this.state.entityData
                  ?.slice(this.state.pagination.startIndex, this.state.pagination.endIndex)
                  .map((item, index) => {
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
                                  city: item?.city,
                                },
                              }}
                            >
                              {item?.count}
                            </Link>
                          ) : (
                            0
                          )}
                        </td>
                        {index == 0 && (
                          <td colSpan={13} rowSpan={10} style={{ background: '#eee' }}>
                            Comming Soon
                          </td>
                        )}
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
            <ReactPagination
              pageNo={this.state.pagination.page - 1}
              pageSize={10}
              totalItems={this.state.entityData.length}
              onPageChange={this.handlePageChange}
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
