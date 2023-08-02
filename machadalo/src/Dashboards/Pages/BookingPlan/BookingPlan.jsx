import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import $ from 'jquery';
import './bookingPlan.css';
import ReactDOM from 'react-dom';
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { IoClose } from 'react-icons/io5';
import { BsSliders2 } from 'react-icons/bs';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import { CampaignInventoryAtom } from '../../_states';
import AddBrandModal from './AddBrandModal';
import RelationshipModal from './RelationshipModal';
import AssignUserModal from './AssignUserModal';
import ContactDetailModal from './ContactDetailModal';
import CommentModal from './CommentModal';
import PaymentDetailModal from './PaymentDetailModal';
import PermissionModal from './PermissionModal';
import ReceiptModal from './ReceiptModal';
import ReactPagination from '../../Pagination/Pagination';

export default function BookingPlan() {
  const BookingApi = BookinPlanActions();
  const tableRef = useRef();
  const tableName = 'bookingPlanTable';
  const [columnsList, setColumnList] = useState({});
  const CampaignInventoryList = useRecoilValue(CampaignInventoryAtom);
  const [filterShow, setFilterShow] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    type: '',
  });

  useEffect(() => {
    const table = new DataTable(`#${tableName}`, {
      details: {
        renderer: $.fn.dataTable.Responsive.renderer.listHiddenNodes(),
      },
      info: false,
      paging: false,
      responsive: true,
      searching: false,
    });
    // Extra step to do extra clean-up.
    // return function () {
    //   console.log('Table destroyed');
    //   table.destroy();
    // };
  }, [1]);

  async function getHeaderDataList() {
    let header = await BookingApi.getHeaderData();
    console.log(header);
    setColumnList(header);
  }

  useEffect(() => {
    BookingApi.getCampaignInventories();
    getHeaderDataList();
  }, [1]);
  return (
    <>
      <div className="booking-plan-wrapper">
        <h2>Booking Plan</h2>
        <div className="status-bar mb-2">
          <div className="status-bar-item">
            <span className="status-lable">Campaign Id:</span>
            <span className="status-data">AAKAAK002A</span>
          </div>
          <div className="status-bar-item">
            <span className="status-lable">Campaign Name:</span>
            <span className="status-data">Aakash Ghodbunder</span>
          </div>
          <div className="status-bar-item">
            <span className="status-lable">BD Owner:</span>
            <span className="status-data">vidhidevelopment</span>
          </div>
          <div className="status-bar-item">
            <span className="status-lable">Campaign State:</span>
            <span className="status-data">Converted</span>
          </div>
        </div>
        <div>
          <span>
            <Button
              variant="primary me-2"
              onClick={(e) => {
                setFilterShow(!filterShow);
              }}
            >
              <BsSliders2 />
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                setShowModal({ show: true, type: 'AssignUser' });
              }}
            >
              Assign User
            </Button>
          </span>
        </div>
        <div className="booking-plan-table">
          {/* id={tableName} ref={tableRef} */}
          <Table responsive className="display booking-table" width="100%">
            <thead>
              <tr>
                <th>{columnsList.srNo}</th>
                <th>{columnsList.brand}</th>
                <th>{columnsList.name}</th>
                <th>{columnsList.supplier_id}</th>
                <th>{columnsList.supplier_type}</th>
                <th>{columnsList.area_subArea}</th>
                <th>{columnsList.address_landmark}</th>
                <th>{columnsList.relation_ship_data}</th>
                <th>{columnsList.unit_primary_count}</th>
                <th>{columnsList.unit_secondary_count}</th>
                <th>{columnsList.contacts_details}</th>
                <th>{columnsList.assign_user}</th>
                {/* <th ng-if="releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_r_g' || releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d'">
              {{columnsList.requirement_given}}</th> */}
                <th>{columnsList.booking_priority}</th>
                <th>{columnsList.booking_status_and_sub_status}</th>
                <th>{columnsList.phase}</th>
                <th>{columnsList.internal_comments}</th>
                <th>{columnsList.comments}</th>
                <th>{columnsList.next_action_date}</th>
                <th>{columnsList.inventory_type}</th>
                <th>{columnsList.inventory_count}</th>
                <th>{columnsList.inventory_days}</th>
                <th>{columnsList.inventory_supplier_price}</th>
                <th>{columnsList.total_supplier_price}</th>
                <th>{columnsList.negotiated_price}</th>
                {/* <th>{{columnsList.cost_per_unit}}</th>  */}
                <th>Cost Per Supplier</th>
                <th>{columnsList.freebies}</th>
                <th>{columnsList.mode_of_payment}</th>
                <th>{columnsList.transaction_cheque_number}</th>
                <th>{columnsList.payment_status}</th>
                <th>{columnsList.permission_box}</th>
                <th>{columnsList.receipt}</th>
                <th>{columnsList.lead_performance_summary}</th>
                <th>{columnsList.completion_status}</th>
                <th>{columnsList.delete_action}</th>
                <th>Update</th>

                {/* {columnsList &&
                columnsList.length > 0 &&
                columnsList.map((item, index) => {
                  return <th key={index}>{item.title}</th>;
                })} */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'Add-Brand' });
                    }}
                  >
                    Add
                  </Button>
                </td>
                <td>
                  <a>Gurgoan One</a>(Ultra High)
                </td>
                <td>NDLGGNS22RSGUR</td>
                <td>Residential Society</td>
                <td>Medium High (Sec-22)</td>
                <td>Sector -22</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'RelationshipData' });
                    }}
                  >
                    View
                  </Button>
                </td>
                <td>245</td>
                <td>8</td>
                <td>
                  Abhishek (9953008206){' '}
                  <a
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'ContactDetails' });
                    }}
                  >
                    View/Add
                  </a>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'AssignUser' });
                    }}
                  >
                    Assign User
                  </Button>
                </td>
                <td>
                  <Select
                    className=""
                    options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                    label="Booking Priority"
                    id="BookingPriority"
                    placeholder="Booking Priority"
                  />
                </td>
                <td>
                  <Select
                    className=""
                    options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                    label="Booking Status"
                    id="BookingStatus"
                    placeholder="Booking Status"
                  />
                  <Select
                    className=""
                    options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                    label="Booking Sub Status"
                    id="BookingSubStatus"
                    placeholder="Booking Sub Status"
                  />
                </td>
                <td>
                  <Select
                    className=""
                    options={[{ label: 'phase1' }, { label: 'phase2' }, { label: 'phase3' }]}
                    label="Phase"
                    id="phase"
                    placeholder="phase"
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'internalComments' });
                    }}
                  >
                    View/Add
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'comments' });
                    }}
                  >
                    View/Add
                  </Button>
                </td>
                <td>
                  <Form.Control type="date" placeholder="Next Action Date" />
                </td>
                <td>
                  <a>Poster</a>
                </td>
                <td>70</td>
                <td>input type Number</td>
                <td>50rs</td>
                <td></td>
                <td>1000</td>
                <td>500</td>
                <td>
                  <Form>
                    <div className="mb-3 b-form-maindiv">
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>WhatsApp Group</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>Email</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>Billing</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>Announcement</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                    </div>
                  </Form>
                </td>
                <td>
                  <Form>
                    <div className="mb-3 b-form-maindiv">
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>NFFT</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>CHEQUE</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox" isValid />
                        <Form.Check.Label>CASH</Form.Check.Label>
                        {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                      </Form.Check>
                    </div>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        setShowModal({ show: true, type: 'PaymentDetail' });
                      }}
                    >
                      Details
                    </Button>
                  </Form>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                  />
                </td>
                <td>
                  <Select
                    className=""
                    options={[
                      { label: 'Pay1 Status' },
                      { label: 'Pay1 Status' },
                      { label: 'Pay1 Status' },
                    ]}
                    label="Payment Status"
                    id="PaymentStatus"
                    placeholder="Payment Status"
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'Permission' });
                    }}
                  >
                    View/Add
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setShowModal({ show: true, type: 'Receipt' });
                    }}
                  >
                    View/Add
                  </Button>
                </td>
                <td></td>
                <td>
                  <div className="mb-3 b-form-maindiv">
                    <Form.Check
                      inline
                      label="Completed"
                      name="group1"
                      type="radio"
                      id="completed"
                    />
                    <Form.Check
                      inline
                      label="Not Completed"
                      name="group1"
                      type="radio"
                      id="Notcompleted"
                    />
                  </div>
                </td>
                <td>
                  <Button variant="primary" className="btn btn-danger">
                    Delete
                  </Button>
                </td>
                <td>
                  <Button variant="primary" className="btn btn-success">
                    Update
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="list__footer">
            <ReactPagination
              pageNo={1}
              pageSize={10}
              totalItems={100}
              onPageChange={console.log(1111)}
            />
          </div>
        </div>

        <div
          className="booking-filter"
          style={{
            display: filterShow ? 'block' : 'none',
          }}
        >
          <h5>Booking Filter</h5>
          <div
            className="filter-close"
            onClick={(e) => {
              setFilterShow(!filterShow);
            }}
          >
            <IoClose />
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Supplier Type</Form.Label>
              <Select
                className=""
                options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                label="Supplier Type"
                id="SupplierType"
                placeholder="Supplier Type"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Booking Status</Form.Label>
              <Select
                className=""
                options={[
                  { label: 'Booking Status 1' },
                  { label: 'Booking Status 2' },
                  { label: 'Booking Status 3' },
                ]}
                label="Booking Status"
                id="BookingStatus"
                placeholder="Booking Status"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Phases</Form.Label>
              <Select
                className=""
                options={[{ label: '1' }, { label: '2' }, { label: '3' }]}
                label="Phases"
                id="Phases"
                placeholder="Phases"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>User</Form.Label>
              <Select
                className=""
                options={[{ label: '1' }, { label: '2' }, { label: '3' }]}
                label="User"
                id="User"
                placeholder="User"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Next Action Date</Form.Label>
              <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>
            <div className="filter-action-wrapper">
              <Button variant="secondary" type="submit">
                Back
              </Button>

              <Button variant="info" type="submit">
                Clear
              </Button>
              <Button variant="primary" type="submit">
                Apply
              </Button>
            </div>
          </Form>
        </div>

        <div>
          <Modal
            show={showModal.show}
            onHide={(e) => {
              setShowModal({ show: false, type: '' });
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {showModal.type == 'Add-Brand'
                  ? 'Add Brand'
                  : showModal.type == 'RelationshipData'
                  ? 'Supplier Details'
                  : showModal.type == 'ContactDetails'
                  ? 'Contact Detail'
                  : showModal.type == 'AssignUser'
                  ? 'Assign User'
                  : showModal.type == 'internalComments'
                  ? 'Internal Comments'
                  : showModal.type == 'comments'
                  ? 'Comments'
                  : showModal.type == 'PaymentDetail'
                  ? 'Payment Detail'
                  : showModal.type == 'Permission'
                  ? 'Permission Box Image Details for HDFC Distributor 3'
                  : showModal.type == 'Receipt'
                  ? 'Receipt Box Image Details for HDFC Distributor 3'
                  : 'Other'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showModal.type == 'Add-Brand' ? (
                <AddBrandModal />
              ) : showModal.type == 'RelationshipData' ? (
                <RelationshipModal />
              ) : showModal.type == 'AssignUser' ? (
                <AssignUserModal />
              ) : showModal.type == 'ContactDetails' ? (
                <ContactDetailModal />
              ) : showModal.type == 'comments' || showModal.type == 'internalComments' ? (
                <CommentModal />
              ) : showModal.type == 'PaymentDetail' ? (
                <PaymentDetailModal />
              ) : showModal.type == 'Permission' ? (
                <PermissionModal />
              ) : showModal.type == 'Receipt' ? (
                <ReceiptModal />
              ) : (
                ''
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}
