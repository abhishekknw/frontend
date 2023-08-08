import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';

export default function ContactDetailModal(props) {
  const { data } = props;
  const BookingApi = BookinPlanActions();

  async function getContactDetails() {
    let res = BookingApi.getContactDetailsData(data);
    console.log(res);
  }
  useEffect(() => {
    getContactDetails();
  }, []);
  return (
    <>
      <div>
        <Table className="table-center" responsive>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Relationship Status</th>
            <th>Comments</th>
            <th>Landline No</th>
            <th>Mobile No</th>
            <th>Remove</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Email</td>
            <td>Status</td>
            <td>Comments</td>
            <td>Landline No</td>
            <td>Mobile No</td>
            <td>
              <button className="btn btn-primary">Remove</button>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Email</td>
            <td>Status</td>
            <td>Comments</td>
            <td>Landline No</td>
            <td>Mobile No</td>
            <td>
              <button className="btn btn-primary">Remove</button>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Email</td>
            <td>Status</td>
            <td>Comments</td>
            <td>Landline No</td>
            <td>Mobile No</td>
            <td>
              <button className="btn btn-primary">Remove</button>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Email</td>
            <td>Status</td>
            <td>Comments</td>
            <td>Landline No</td>
            <td>Mobile No</td>
            <td>
              <button className="btn btn-primary">Remove</button>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Email</td>
            <td>Status</td>
            <td>Comments</td>
            <td>Landline No</td>
            <td>Mobile No</td>
            <td>
              <button className="btn btn-primary">Remove</button>
            </td>
          </tr>
        </Table>
        <div className="pt-4">
          <div className="d-flex justify-content-between">
            <div>
              <span>
                <button className="btn me-3 btn-primary">Add</button>
              </span>
              <span>
                <button className="btn me-3 btn-success">Save</button>
              </span>
            </div>
            <div>
              <span>
                <button className="btn me-3 btn-primary">Edit</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
