import React from 'react';
import { Table } from 'react-bootstrap';

export default function RelationshipModal() {
  return (
  <>
    <div className='rdiv'> 
      <ul>
        <li><h4 className='relationhead'>Supply Owner / Representative</h4></li>
        <li className='relationdata'></li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Feedback About Supplier</h4></li>
        <li className='relationdata'>Not Given</li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Last Campaign Price With Name	</h4></li>
        <li className='relationdata'>-</li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Last Campaign Price per unit </h4></li>
        <li className='relationdata'></li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Count Of Previous Campaigns</h4></li>
        <li className='relationdata'>0</li>
      </ul>


    </div>
    <div className='camp-box'>
      <div>
        <h3>
          Recently Held Campaigns
        </h3>
          <Table className='text-center ' responsive>
            <tr>
              <th>Index</th>
              <th>Campaigns Name</th>
              <th>Organisation Name</th>
            </tr>
            <tr>
              <td>Index</td>
              <td>Campaigns Name</td>
              <td>Organisation Name</td>
            </tr>
          </Table>
      </div>

      <div>
        <h3>
        Relationship Status
        </h3>
          <Table className='text-center ' responsive>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Relationship status</th>
            </tr>
            <tr>
              <td>Index</td>
              <td>Campaigns Name</td>
              <td>Organisation Name</td>
              <td>Organisation Name</td>
            </tr>
          </Table>
      </div>

    </div>
  </>
  );
}
