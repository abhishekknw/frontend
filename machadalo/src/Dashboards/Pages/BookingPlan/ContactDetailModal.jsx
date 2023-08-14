import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import { useRecoilState } from 'recoil';
import { ContactListAtom } from '../../_states';
import { TestingData } from '../../_actions/testingJsonData';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';

export default function ContactDetailModal(props) {
  const { data } = props;
  const BookingApi = BookinPlanActions();
  const [contactList, setContactList] = useRecoilState(ContactListAtom);
  const [selectedRow, setSelectedRow] = useState();

  async function getContactDetails() {
    // let res = BookingApi.getContactDetailsData(data);
    setContactList(TestingData?.data);
  }
  useEffect(() => {
    getContactDetails();
  }, []);

  const contactListHeader = [
    {
      title: 'NAME',
      accessKey: 'name',
      action: function (row, index) {
        return <span> {row?.name}</span>;
      },
    },
    {
      title: 'DESIGNATION',
      accessKey: 'contact_type',
      sort: false,
    },
    {
      title: 'EMAIL',
      accessKey: 'email',
      sort: false,
      // action: function (row, index) {
      //   return <span> {dayjs(row?.start_date).format('DD-MM-YYYY')}</span>;
      // },
    },
    {
      title: 'RELATIONSHIP STATUS',
      accessKey: 'relationship_status',
      sort: false,
      // action: function (row, index) {
      //   return <span>{dayjs(row?.start_date).format('DD-MM-YYYY')}</span>;
      // },
    },
    {
      title: 'COMMENTS',
      accessKey: 'comments',
      sort: false,
      // action: function (row, index) {
      //   return <Button className="btn btn-primary">Remove</Button>;
      // },
    },
    {
      title: 'LANDLINE NO',
      accessKey: 'landline',
      sort: false,
      // action: function (row, index) {
      //   return <Button className="btn btn-primary">Remove</Button>;
      // },
    },
    {
      title: 'REMOVE',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return (
          <>
            <Button className="btn btn-primary">Remove</Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div>
        {contactList && (
          <ReactBootstrapTable headerData={contactListHeader} rowData={contactList} />
        )}
        {/* <Table className="table-center" responsive>
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
        </Table> */}
        <div className="pt-4">
          <div className="d-flex justify-content-between">
            <div>
              <span>
                <Button className="btn me-3 btn-primary">Add</Button>
              </span>
              <span>
                <Button className="btn me-3 btn-success">Save</Button>
              </span>
            </div>
            <div>
              <span>
                <Button className="btn me-3 btn-primary">Edit</Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
