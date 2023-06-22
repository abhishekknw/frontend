import React, { useState } from 'react';
// import { Table } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const CommonTable = ({ headerData, bodyData }) => {
  const [isExpandRow, setIsExpandRow] = useState({ b2b: false, b2c: false });
  console.log(bodyData);
  return (
    <>
      <Table striped bordered hover className="leads-table ">
        <Thead className="leads-tbody">
          <Tr>
            <Th className='sn-table'></Th>
            {headerData.map((ele, index) => {
              return (
                <>
                <Th key={ele.name}><div data-toggle="tooltip" data-placement="top" title={ele.tooltip}>{ele.name}</div></Th>
                </>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>{bodyData()}</Tbody>
      </Table>
    </>
  );
};

export default CommonTable;
