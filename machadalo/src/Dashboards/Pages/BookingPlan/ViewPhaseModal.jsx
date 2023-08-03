import React from 'react';
import { Table } from 'react-bootstrap';

export default function ViewPhaseModal() {
  return (
    <>
      <div>
        <Table className='table-center' responsive>
          <tr>
            <th>Index</th>
            <th>Phases</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Remove</th>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>31-10-2018</td>
            <td>01-11-2018</td>
            <td><button className='btn btn-primary'>Remove</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>01-11-2018</td>
            <td>02-11-2018	</td>
            <td><button className='btn btn-primary'>Remove</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>06-05-2019</td>
            <td>11-05-2019</td>
            <td><button className='btn btn-primary'>Remove</button></td>
          </tr>
          <tr>
            <td>4</td>
            <td>4</td>
            <td>22-05-2019</td>
            <td>26-05-2019</td>
            <td><button className='btn btn-primary'>Remove</button></td>
          </tr>
          <tr>
            <td>5</td>
            <td>5</td>
            <td>24-04-2020</td>
            <td>10-05-2020</td>
            <td><button className='btn btn-primary'>Remove</button></td>
          </tr>
        </Table>
      <div>
        <span><button className='btn me-3 btn-danger'>Edit</button></span>
        <span><button className='btn me-3 btn-primary'>Add</button></span>
        <span><button className='btn me-3 btn-success'>Save</button></span>
      </div>
      </div>
    </>
  );
}
