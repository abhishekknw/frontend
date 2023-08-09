import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import './react-bootstrap-table.css';
import { SortingActions } from './sorting.action';

export default function ReactBootstrapTable(props) {
  const { rowData, headerData } = props;
  const sorting = SortingActions();
  const [tableData, setRowData] = useState(rowData);
  const [sort, setSort] = useState(false);
  const [reverse, setReverse] = useState(false);

  const onSortData = (key, sort) => {
    if (sort) {
      setSort(key);
      let sortData = sorting.sortTableData(tableData, key, reverse);
      setRowData(sortData);
    } else {
      setSort(false);
      return 0;
    }
  };

  return (
    <div>
      <Table responsive className="react-bootstrap-table v-middle">
        <thead>
          <tr>
            {headerData.map((header, index) => {
              return (
                <th
                  key={index + header?.title}
                  className={
                    header?.sort
                      ? `sortable ${sort == header?.accessKey ? `${reverse ? 'asc' : 'desc'}` : ''}`
                      : ''
                  }
                  onClick={(e) => {
                    setReverse(!reverse);
                    onSortData(header?.accessKey, header?.sort);
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
                        : header?.accessKey == 'action'
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
