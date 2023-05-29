import React from 'react';


import Table from 'react-bootstrap/Table';
import './index.css';

export default function ViewTable(props) {


  return (
    <>
      <h2 style={{ paddingTop: '10px' }}>ViewTable</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>S.No.</th>
            <th>Lead type</th>
            <th>Lead Count</th>
            <th>Lead accepted by QA</th>
            <th>Lead Accepted by Client</th>
            <th>View Client Wise</th>
            <th>View Agency Wise</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>

        </tbody>
      </Table>
    </>
  );
}
