import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './react-bootstrap-table.css';
import { sortingTableData } from '../../_actions/sorting.action';

export default function ReactBootstrapTable(props) {
  const { rowData, headerData, sortingData } = props;
  const [tableData, setRowData] = useState(rowData);
  const [sorted, setSort] = useState(false);
  const [reverse, setReverse] = useState(false);

  const onSortData = (key, sort, type) => {
    if (sort) {
      setSort(key);
      let newList = sortingTableData(tableData, key, reverse);
      setRowData(newList);
      if (sortingData) {
        sortingData(key, reverse, type);
      }
    } else {
      setSort(false);
      return 0;
    }
  };
  useEffect(() => {
    setRowData(props?.rowData);
  }, [props]);

  return (
    <div>
      <Table responsive className={`react-bootstrap-custom-table v-middle ${props?.className} `}>
        <thead>
          <tr>
            {headerData.map((header, index) => {
              return (
                <th
                  key={index + header?.title}
                  className={`${
                    header?.sort
                      ? `sortable-custom ${
                          sorted == header?.accessKey ? `${reverse ? 'asc' : 'desc'}` : ''
                        }`
                      : ''
                  } ${header?.thClassName !== undefined ? header?.thClassName : ''}`}
                  onClick={(e) => {
                    setReverse(!reverse);
                    onSortData(header?.accessKey, header?.sort, header?.type);
                  }}
                >
                  {header?.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            let rowIndex = index;
            return (
              <tr key={rowIndex}>
                {headerData.map((header, index) => {
                  return (
                    <td key={index + '' + rowIndex}>
                      {header?.accessKey == 'index'
                        ? header?.action(data, rowIndex)
                        : header?.action
                        ? header?.action(data)
                        : data[header?.accessKey]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

// const [headerData, setHeaderData] = useState([
//   {
//     title: '#',
//     accessKey: 'index',
//     sort: false,
//     action: function (row, index) {
//       return index + 1;
//     },
//   },
//   { title: 'Name', accessKey: 'name', sort: true },
//   { title: 'Price', accessKey: 'price', sort: true },
//   {
//     title: 'Action',
//     accessKey: 'action',
//     sort: false,
//     action: function (row) {
//       return (
//         <Button
//           variant="primary"
//           onClick={(e) => {
//             console.log(row);
//           }}
//         >
//           Action
//         </Button>
//       );
//     },
//   },
// ]);
{
  /* <ReactBootstrapTable
headerData={headerData}
rowData={details?.campaign_data?.campaigns}
/> */
}
