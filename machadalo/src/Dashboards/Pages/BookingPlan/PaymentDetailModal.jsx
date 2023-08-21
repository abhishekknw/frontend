import React from 'react';
import { Table } from 'react-bootstrap';
export default function PaymentDetailModal(props) {
  const { data } = props;
  return (
    <>
      <div>
        <Table className="table-center" responsive>
          <tr>
            <th>Name On Cheque</th>
            <th>Bank Name</th>
            <th>IFSC Code</th>
            <th>Account Number</th>
          </tr>
          <tr>
            <td>{data?.beneficiary_name}</td>
            <td>{data?.bank_name}</td>
            <td>{data?.ifsc_code}</td>
            <td>{data?.account_number}</td>
          </tr>
        </Table>
        <div>
          <span>
            <button className="btn me-3 btn-primary">Edit</button>
          </span>
        </div>
      </div>
    </>
  );
}
