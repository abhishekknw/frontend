import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import { useRecoilState } from 'recoil';
import { ContactListAtom } from '../../_states';
import { TestingData } from '../../_actions/testingJsonData';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';

export default function ContactDetailModal(props) {
  const { data } = props;
  const BookingApi = BookinPlanActions();
  const [contactList, setContactList] = useRecoilState(ContactListAtom);
  const addNewContact = {
    name: '',
    designation: '',
    email: '',
    relationship_status: '',
    comments: '',
    landline: '',
    mobile: '',
  };
  const [editEnable, setEditEnable] = useState(true);

  async function getContactDetails() {
    await BookingApi.getContactDetailsData(data);
  }
  const deleteContactObj = async (row, index) => {
    if (!row?.id) {
      let newList = [];
      for (let i in contactList) {
        if (i != index) {
          newList.push(contactList[i]);
        }
      }
      setContactList(newList);
    } else {
      await BookingApi.deletContact(row, index);
    }
  };

  useEffect(() => {
    getContactDetails();
  }, []);

  const contactListHeader = [
    {
      title: 'NAME',
      accessKey: 'name',
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.name}</span>
            ) : (
              <Form.Control
                type="text"
                id="contactName"
                aria-describedby="contactName"
                value={row?.name}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'DESIGNATION',
      accessKey: 'contact_type',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.contact_type}</span>
            ) : (
              <Form.Control
                type="text"
                id="contactName"
                aria-describedby="contactName"
                value={row?.contact_type}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'EMAIL',
      accessKey: 'email',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.contact_type}</span>
            ) : (
              <Form.Control
                type="text"
                id="email"
                aria-describedby="email"
                value={row?.email}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'RELATIONSHIP STATUS',
      accessKey: 'relationship_status',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.relationship_status}</span>
            ) : (
              <Form.Control
                type="text"
                id="relationship_status"
                aria-describedby="relationship_status"
                value={row?.relationship_status}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'COMMENTS',
      accessKey: 'comments',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.comments}</span>
            ) : (
              <Form.Control
                type="text"
                id="comments"
                aria-describedby="comments"
                value={row?.comments}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'LANDLINE NO',
      accessKey: 'landline',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.landline}</span>
            ) : (
              <Form.Control
                type="text"
                id="comments"
                aria-describedby="comments"
                value={row?.landline}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'MOBILE',
      accessKey: 'mobile',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {editEnable ? (
              <span>{row?.mobile}</span>
            ) : (
              <Form.Control
                type="text"
                id="comments"
                aria-describedby="comments"
                value={row?.mobile}
                required
                disabled={editEnable}
                onChange={(e) => {
                  console.log(111111);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: 'REMOVE',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return (
          <div className="action-icon">
            <span
              onClick={(e) => {
                deleteContactObj(row, index);
              }}
            >
              <BsTrash3 />
            </span>
          </div>
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
        <div className="pt-4">
          <div className="d-flex justify-content-between">
            <div>
              <span>
                <Button
                  className="btn me-3 btn-primary"
                  onClick={(e) => {
                    setContactList([...contactList, addNewContact]);
                  }}
                >
                  Add
                </Button>
              </span>
              <span>
                <Button className="btn me-3 btn-success">Save</Button>
              </span>
            </div>
            <div>
              <span>
                <Button
                  className="btn me-3 btn-primary"
                  onClick={(e) => {
                    setEditEnable(!editEnable);
                  }}
                >
                  Edit
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
