import React from 'react';
import { Table } from 'react-bootstrap';
export default function PaymentDetailModal() {
  return(
    <>
    <div>
    <Table className='table-center' responsive>
          <tr>
            <th>Name On Cheque</th>
            <th>Bank Name</th>
            <th>IFSC Code</th>
            <th>Account Number</th>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>31-10-2018</td>
            <td>01-11-2018</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>01-11-2018</td>
            <td>02-11-2018	</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>06-05-2019</td>
            <td>11-05-2019</td>
          </tr>
          <tr>
            <td>4</td>
            <td>4</td>
            <td>22-05-2019</td>
            <td>26-05-2019</td>
          </tr>
          <tr>
            <td>5</td>
            <td>5</td>
            <td>24-04-2020</td>
            <td>10-05-2020</td>
          </tr>
        </Table>
        <div>
        <span><button className='btn me-3 btn-danger'>Edit</button></span>
      </div>
    </div>
    
    </>
    );
}
