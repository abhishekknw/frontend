import React, { useEffect, useState } from 'react';
import LoadingWrapper from '../../Error/LoadingWrapper';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import TableHeader from '../../../Dashboards/Table/TableHeader/TableHeader';
import ReactPagination from '../../../Dashboards/Pagination/Pagination';
import { sortingTableData } from '../../../Dashboards/_actions/sorting.action';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';

export default function EntityCitywiseCount(props) {
  const { name, supplier_type } = props.location.state;
  const headerValue = `Citywise Report - ${name}`;
  const fetchWrapper = useFetchWrapper();
  const [entityData, setEntityData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [paginationData, setPagination] = useState({
    page: 0,
    total_count: 0,
  });
  const [sorting, setSorting] = useState({ sortingKey: '', sortReverse: false });

  const getEntityData = async (filters) => {
    await fetchWrapper
      .get(
        `/v0/ui/ops/get-supplier-summary-city-wise/?supplier_type=${supplier_type}&next_page=${
          filters?.page + 1
        }`
      )
      .then((res) => {
        if (res.status) {
          setEntityData(res?.data?.list);
          setPagination({ page: filters?.page, total_count: res?.data?.total_count });
          setIsDataFetched(true);
        }
      })
      .catch((ex) => {
        console.log('Failed to get data');
        setIsDataFetched(true);
      });
  };

  const handlePageChange = (event) => {
    setIsDataFetched(false);
    let obj = { ...paginationData, page: event.selected };
    getEntityData(obj);
  };
  const sortingData = (tableData, accessKey, reverse, type) => {
    let newList = sortingTableData(tableData, accessKey, reverse, type);
    setSorting({ sortReverse: !sorting.sortReverse, sortingKey: accessKey });
    setEntityData(newList);
  };

  useEffect(() => {
    getEntityData(paginationData);
  }, []);
  return (
    <div>
      <TableHeader headerValue={headerValue} />

      {isDataFetched ? (
        <div>
          <div style={{ width: '100%' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => props.history.push(`/r/operations-dashboard/entity`)}
              // style={{ marginTop: '0px' }}
            >
              <i className="fa fa-arrow-left" aria-hidden="true" />
              &nbsp; Back
            </button>
          </div>
          <Table responsive className={`react-bootstrap-custom-table v-middle`}>
            <thead>
              '{' '}
              <tr style={({ padding: '8px 14px' }, { whiteSpace: 'nowrap' })}>
                <th
                  rowSpan="2"
                  className={`sortable ${
                    sorting.sortingKey == 'city' ? `${sorting.sortReverse ? 'asc' : 'desc'}` : ''
                  }`}
                  onClick={(e) => {
                    sortingData(entityData, 'city', sorting.sortReverse);
                  }}
                >
                  City
                </th>
                <th
                  rowSpan="2"
                  className={`sortable ${
                    sorting.sortingKey == 'count' ? `${sorting.sortReverse ? 'asc' : 'desc'}` : ''
                  }`}
                  onClick={(e) => {
                    sortingData(entityData, 'count', sorting.sortReverse, 'Number');
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
              {entityData?.map((item, index) => {
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
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <ReactPagination
            pageNo={paginationData.page}
            pageSize={10}
            totalItems={paginationData.total_count}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <LoadingWrapper />
      )}
    </div>
  );
}
