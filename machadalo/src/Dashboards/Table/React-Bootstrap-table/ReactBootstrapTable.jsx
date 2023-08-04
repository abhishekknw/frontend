import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import './react-bootstrap-table.css';
import { Button } from 'react-bootstrap';
export default function (props) {
  const RowData = [
    {
      id: 0,
      name: 'test0',
      price: '$0',
    },
    {
      id: 1,
      name: 'test1',
      price: '$1',
    },
    {
      id: 2,
      name: 'test2',
      price: '$2',
    },
    {
      id: 3,
      name: 'test3',
      price: '$3',
    },
    {
      id: 4,
      name: 'test4',
      price: '$4',
    },
  ];

  const headerData = [
    { title: '#', accessKey: 'index', sort: false },
    { title: 'Name', accessKey: 'name', sort: true },
    { title: 'Price', accessKey: 'price', sort: true },
    {
      title: 'Action',
      accessKey: 'action',
      sort: false,
      action: function (row) {
        return (
          <Button
            variant="primary"
            onClick={(e) => {
              console.log(row);
            }}
          >
            Action
          </Button>
        );
      },
    },
  ];

  const [sort, setSort] = useState(null);
  const [reverse, setReverse] = useState(false);

  return (
    <div>
      <Table responsive className="react-bootstrap-custom-table">
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
                    setSort(header?.accessKey);
                  }}
                >
                  {header?.title}
                </th>
              );
            })}
          </tr>
          {/* <th
              className={`sortable ${sort == 'id' ? `${reverse ? 'asc' : 'desc'}` : ''}`}
              onClick={(e) => {
                setReverse(!reverse);
                setSort('id');
              }}
            >
              #
            </th>
            <th
              className={`sortable ${sort == 'name' ? `${reverse ? 'asc' : 'desc'}` : ''}`}
              onClick={(e) => {
                setReverse(!reverse);
                setSort('name');
              }}
            >
              Name
            </th>
            <th
              className={`sortable ${sort == 'price' ? `${reverse ? 'asc' : 'desc'}` : ''}`}
              onClick={(e) => {
                setReverse(!reverse);
                setSort('price');
              }}
            >
              Price
            </th> */}
        </thead>
        <tbody>
          {RowData.map((data, index) => {
            let rowIndex = index;
            return (
              <tr key={index + data.id}>
                {headerData.map((header, index) => {
                  return (
                    <td key={index + header?.accessKey}>
                      {header?.accessKey == 'index'
                        ? rowIndex + 1
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
