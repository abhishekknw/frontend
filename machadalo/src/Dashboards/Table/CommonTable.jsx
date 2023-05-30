import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const CommonTable = ({ headerData, bodyData }) => {
  const [isExpandRow, setIsExpandRow] = useState({ b2b: false, b2c: false });
  console.log(bodyData);
  return (
    <>
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th></th>
            {headerData.map((ele, key) => {
              return <th key={key}>{ele.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>{bodyData()}</tbody>
      </Table>
    </>
  );
};

export default CommonTable;
