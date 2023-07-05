import React from 'react'
import Table from 'react-bootstrap/Table';
import './opsdashboard.css';
export default function OpsDashboard() {
  return (
    <>
    <div className='container'>
        <h2>Requirement Details</h2>

        <div className='browe-leads-div'>
          <h3>Browsed Leads</h3>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>  <Table striped bordered hover>
      <thead>
        <tr>
          <th>Current Partner</th>
          <th>FeedBack</th>
          <th>Preferred Partner</th>
          <th>L4 Answers</th>
          <th>L5 Answers</th>
          <th>L6 Answers</th>
          <th>Lead Status</th>
          <th>Comment</th>
          <th>Internal Comment</th>
          <th>Lead Given by</th>
          <th>Supplier Agency</th>
          <th>Agency User</th>
          <th>Call Status</th>
          <th>Price</th>
          <th>Timestamp</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
        </div>
    </div>
    </>
  )
}
