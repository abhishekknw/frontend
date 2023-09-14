// import React from 'react';
import React, { useEffect, useState } from 'react';
import LoadingWrapper from '../../Shared/LoadingWrapper';
import TableHeader from '../../../Dashboards/Table/TableHeader/TableHeader';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import ReactPagination from '../../../Dashboards/Pagination/Pagination';
import { sortingTableData } from '../../../Dashboards/_actions/sorting.action';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';

export default function EntityCount() {
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
      .get(`v0/ui/ops/get-supplier-summary-agencywise/?next_page=${filters?.page + 1}`)
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
    <div style={{ marginTop: '1em' }}>
      <TableHeader headerValue="Entity Report" />
      {isDataFetched ? (
        <>
          <Table responsive className={`react-bootstrap-custom-table v-middle`}>
            <thead>
              <tr>
                <th
                  rowSpan="2"
                  className={`sortable-custom ${
                    sorting.sortingKey == 'supplier_type'
                      ? `${sorting.sortReverse ? 'asc' : 'desc'}`
                      : ''
                  }`}
                  onClick={(e) => {
                    sortingData(entityData, 'supplier_type', sorting.sortReverse);
                  }}
                >
                  Entity Type
                </th>
                <th
                  rowSpan="2"
                  className={`sortable-custom ${
                    sorting.sortingKey == 'count' ? `${sorting.sortReverse ? 'asc' : 'desc'}` : ''
                  }`}
                  onClick={(e) => {
                    sortingData(entityData, 'count', sorting.sortReverse, 'Number');
                  }}
                >
                  Entity Count
                </th>
                <th rowSpan="2">Company</th>
                <th colSpan="3">Contact Name</th>
                <th colSpan="3">Contact Number</th>
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
              {entityData?.map((item, index) => {
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
                              name: item?.supplier_type,
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
                    {index == 0 && (
                      <td colSpan={6} rowSpan={10} style={{ background: '#eee' }}>
                        Comming Soon
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <ReactPagination
            pageNo={paginationData?.page}
            pageSize={10}
            totalItems={paginationData?.total_count}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <LoadingWrapper />
      )}
    </div>
  );
}
