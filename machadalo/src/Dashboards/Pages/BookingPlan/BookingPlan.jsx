import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
// import $ from 'jquery';
import './bookingPlan.css';
// import ReactDOM from 'react-dom';
// import DataTable from 'datatables.net-dt';
// import 'datatables.net-responsive';
import { Table, Button, Form, Modal, ListGroup } from 'react-bootstrap';
import Select from 'react-select';
import { IoClose } from 'react-icons/io5';
import { BsFillCalendarDateFill, BsSliders2 } from 'react-icons/bs';
import { BookinPlanActions } from '../../_actions';
import {
  CampaignInventoryAtom,
  SupplierPhaseListAtom,
  errorAtom,
  BookingStatusAtom,
} from '../../_states';
import AddBrandModal from './AddBrandModal';
import RelationshipModal from './RelationshipModal';
import AssignUserModal from './AssignUserModal';
import ContactDetailModal from './ContactDetailModal';
import CommentModal from './CommentModal';
import PaymentDetailModal from './PaymentDetailModal';
import PermissionModal from './PermissionModal';
import PaymentTypeModal from './PaymentTypeModal';
import ReactPagination from '../../Pagination/Pagination';
import ViewPhaseModal from './ViewPhaseModal';
import AddSupplierModal from './AddSupplierModal';
import ImportSheetModal from './ImportSheetModal';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import TableHeader from '../../Table/TableHeader/TableHeader';
import InventoryModal from './InventoryModal';
import DescriptionHeader from '../../common/DescriptionHeader/DescriptionHeader';
import { BookingFunctions } from './BookingFunctions';
import DataNotFound from '../../common/DataNotFound/DataNotFound';
import LoadingWrapper from '../../common/LoadingWrapper';
import DatePicker from 'react-datepicker';
import DateRangePickerCommon from '../../common/DateRangePicker/DateRangePickerCommon';

export default function BookingPlan(props) {
  // console.log(props, '111111111111111111111111');
  const BookingApi = BookinPlanActions(props);
  const UpdateData = BookingFunctions();
  const useErrorAtom = useRecoilValue(errorAtom);
  // const tableRef = useRef();
  // const tableName = 'bookingPlanTable';
  const [columnsList, setColumnList] = useState({});
  const CampaignInventoryList = useRecoilValue(CampaignInventoryAtom);
  const supplierPhaseList = useRecoilValue(SupplierPhaseListAtom);
  const bookingStatus = useRecoilValue(BookingStatusAtom);

  const [filterShow, setFilterShow] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    type: '',
    rowData: '',
  });
  const [filterData, setFilterData] = useState({
    pageNo: 0,
    supplier_type_code: 'ALL',
    search: '',
    booking_status_code: '',
    phase_id: '',
    assigned: '',
    start_date: '',
    end_date: '',
  });

  const bookingPriorityOption = [
    { label: 'Very High', value: 'VH' },
    { label: 'High', value: 'HH' },
  ];
  const payment_status = [
    { label: 'Not Initiated', value: 'PNI' },
    { label: 'Pending', value: 'PP' },
    { label: 'Cheque Released', value: 'PCR' },
    { label: 'Paid', value: 'PD' },
    { label: 'Rejected', value: 'PR' },
  ];

  const PaymentMethod = [
    {
      label: 'NEFT',
      checked: false,
    },
    {
      label: 'CHEQUE',
      checked: false,
    },
    {
      label: 'CASH',
      checked: false,
    },
  ];
  const freebies = [
    { label: 'WhatsApp Group', checked: false },
    { label: 'Email', checked: false },
    { label: 'Billing', checked: false },
    { label: 'Announcements', checked: false },
  ];

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input btn btn-primary" onClick={onClick} ref={ref}>
      <span>{value ? value : ''}</span>
      <BsFillCalendarDateFill sx={{ marginLeft: '5px' }} />
    </div>
  ));
  // useEffect(() => {
  //   const table = new DataTable(`#${tableName}`, {
  //     details: {
  //       renderer: $.fn.dataTable.Responsive.renderer.listHiddenNodes(),
  //     },
  //     info: false,
  //     paging: false,
  //     responsive: true,
  //     searching: false,
  //   });
  //   // Extra step to do extra clean-up.
  //   // return function () {
  //   //   console.log('Table destroyed');
  //   //   table.destroy();
  //   // };
  // }, [1]);

  async function getHeaderDataList() {
    let header = await BookingApi.getHeaderData();
    setColumnList(header);
  }

  async function getCampaignInventories(data) {
    await BookingApi.getCampaignInventories(data);
  }

  const handlePageChange = (e) => {
    let data = { ...filterData, pageNo: e.selected };
    getCampaignInventories(data);
    setFilterData(data);
  };
  const handleDateChange = (dates) => {
    setFilterData({ ...filterData, start_date: dates[0], end_date: dates[1] });
  };
  const descriptionData = [
    {
      label: 'Campaign Id',
      value: CampaignInventoryList?.campaign?.proposal_id,
    },
    {
      label: 'Campaign Name',
      value: CampaignInventoryList?.campaign?.name,
    },
    {
      label: 'BD Owner',
      value: CampaignInventoryList?.campaign?.created_by,
    },
    {
      label: 'Campaign State',
      value: CampaignInventoryList?.campaign?.campaign_state,
    },
  ];

  useEffect(() => {
    getCampaignInventories(filterData);
    getHeaderDataList();
    BookingApi.getOrganisationList();
    BookingApi.getUserMinimalList();
    BookingApi.getBookingStatus();
    BookingApi.getSupplierPhase();
  }, [1]);
  return (
    <>
      <div className="booking-plan-wrapper">
        <div className="sticky-div" style={{ backgroundColor: '#fff' }}>
          <TableHeader headerValue="Booking Plan" />
          <DescriptionHeader data={descriptionData} />
          <div className="booking-duobtn">
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
        </div>
        {useErrorAtom ? (
          <LoadingWrapper />
        ) : (
          <div className="booking-plan-table book-height">
            {/* id={tableName} ref={tableRef} */}
            <Table responsive className="display booking-table " width="100%">
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
                  {CampaignInventoryList?.campaign?.type_of_end_customer_formatted_name ==
                    'b_to_b_r_g' ||
                    (CampaignInventoryList?.campaign?.type_of_end_customer_formatted_name ==
                      'b_to_b_l_d' && <th>{columnsList.requirement_given}</th>)}
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
                </tr>
              </thead>
              <tbody>
                {CampaignInventoryList.shortlisted_suppliers &&
                  CampaignInventoryList.shortlisted_suppliers.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <span>{data?.brand_organisation_data?.name}</span>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({ show: true, type: 'Add-Brand', rowData: data });
                            }}
                          >
                            Add
                          </Button>
                        </td>
                        <td>
                          <a
                            className="anchor-list"
                            href={`https://www.google.com/maps/?q=${data?.address_supplier?.latitude}${data?.address_supplier?.longitude}`}
                          >
                            {data.name}
                          </a>
                          {data?.quality_rating && <span>({data?.quality_rating})</span>}
                        </td>
                        <td>{data.supplier_id}</td>
                        <td>{data.supplierCode}</td>
                        <td>
                          <span>{data.area}</span>
                          <span>({data.subarea})</span>
                        </td>
                        <td>
                          <span>{data.address1}</span>
                          <span>{data.address2}</span>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({ show: true, type: 'RelationshipData', rowData: data });
                            }}
                          >
                            View
                          </Button>
                        </td>
                        <td>{data?.unit_primary_count}</td>
                        <td>{data?.unit_secondary_count}</td>
                        <td>
                          <span>{data?.contacts[0]?.name}</span>
                          <span>({data?.contacts[0]?.mobile})</span>
                          <a
                            className="anchor-list"
                            onClick={(e) => {
                              setShowModal({ show: true, type: 'ContactDetails', rowData: data });
                            }}
                          >
                            View/Add
                          </a>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({
                                show: true,
                                type: 'AssignUser',
                                rowData: data,
                                campaign: CampaignInventoryList?.campaign,
                              });
                            }}
                          >
                            Assign User
                          </Button>
                        </td>
                        {CampaignInventoryList?.campaign?.type_of_end_customer_formatted_name ==
                          'b_to_b_r_g' ||
                          (CampaignInventoryList?.campaign?.type_of_end_customer_formatted_name ==
                            'b_to_b_l_d' && (
                            <td>
                              <Button>Requirement</Button>
                            </td>
                          ))}

                        <td>
                          <SelectDropdown
                            optionsData={bookingPriorityOption}
                            selectedValue={data.booking_priority}
                            rowData={data}
                            placeholder="Booking Priority"
                            label="Booking Priority"
                            id="BookingPriority"
                            handleSelect={UpdateData.handleSelectPriority}
                          />
                        </td>
                        <td>
                          <SelectDropdown
                            optionsData={bookingStatus}
                            selectedValue={data?.booking_status}
                            rowData={data}
                            placeholder="Booking Status"
                            label="Booking Status"
                            id="BookingStatus"
                            handleSelect={UpdateData.handleSelectBookingStatus}
                          />
                          <SelectDropdown
                            optionsData={UpdateData.getBookingSubStatusList(data?.booking_status)}
                            selectedValue={data?.booking_sub_status}
                            rowData={data}
                            placeholder="Booking Sub Status"
                            label="Booking Sub Status"
                            id="BookingSubStatus"
                            handleSelect={UpdateData.handleBookingSubStatus}
                          />
                          {/* <Select
                            className=""
                            options={UpdateData.getBookingSubStatusList(data?.booking_status)}
                            value={UpdateData.getBookingSubStatusList(data?.booking_status).filter(
                              (obj) => obj.value === data?.booking_sub_status
                            )}
                            label="Booking Sub Status"
                            id="BookingSubStatus"
                            placeholder="Booking Sub Status"
                            onChange={(e) => {
                              UpdateData.handleBookingSubStatus(e, data);
                            }}
                          /> */}
                        </td>
                        <td>
                          <SelectDropdown
                            optionsData={supplierPhaseList}
                            selectedValue={data?.phase_no}
                            rowData={data}
                            placeholder="Select Phase"
                            label="Select Phase"
                            id="SelectPhase"
                            handleSelect={UpdateData.handleSelectPhase}
                          />
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({ show: true, type: 'internalComments', rowData: data });
                            }}
                          >
                            View/Add
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({ show: true, type: 'externalComments', rowData: data });
                            }}
                          >
                            View/Add
                          </Button>
                        </td>
                        <td>
                          {/* <Form.Control
                            type="date"
                            value={data?.next_action_date}
                            onChange={(e) => UpdateData.handleNextActionDate(e, data)}
                            placeholder="Next Action Date"
                          /> */}
                          <DatePicker
                            selected={
                              data?.next_action_date ? new Date(data?.next_action_date) : ''
                            }
                            onChange={(date) => UpdateData.handleNextActionDate(date, data)}
                            customInput={<ExampleCustomInput />}
                          />
                          {/* <SingleDatePicker
                            selectDate={data?.next_action_date}
                            rowData={data}
                            onDateChange={UpdateData.handleNextActionDate}
                          /> */}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({ show: true, type: 'Inventory', rowData: data });
                            }}
                          >
                            Inventory
                          </Button>
                        </td>
                        <td>70</td>
                        <td>
                          <Form.Control
                            type="number"
                            id="inventoryDays"
                            aria-describedby="inventoryDays"
                          />
                        </td>
                        <td>50rs</td>
                        <td></td>
                        <td>{data?.total_negotiated_price}</td>
                        <td>{data?.cost_per_flat}</td>
                        <td>
                          <Form>
                            <div className="mb-3 b-form-maindiv">
                              {freebies.map((check, index) => {
                                return (
                                  <Form.Check
                                    type="checkbox"
                                    id={`Freebies-WhatsApp${index}`}
                                    key={index}
                                  >
                                    <Form.Check.Input
                                      type="checkbox"
                                      isValid
                                      checked={data?.freebies?.includes(check?.label)}
                                      value={check.label}
                                      onChange={(e) => UpdateData.handleCheckFreebies(e, data)}
                                    />
                                    <Form.Check.Label>{check.label}</Form.Check.Label>
                                  </Form.Check>
                                );
                              })}
                            </div>
                          </Form>
                        </td>
                        <td>
                          <Form>
                            <div className="mb-3 b-form-maindiv">
                              {PaymentMethod.map((method, index) => {
                                return (
                                  <>
                                    <Form.Check
                                      key={method?.label}
                                      inline
                                      label={method.label}
                                      name={`payment_method${data?.id}`}
                                      type="radio"
                                      id={`payment_method${method.label}`}
                                      defaultChecked={data?.payment_method == method.label}
                                      value={method.label}
                                      onChange={(e) => {
                                        UpdateData.handlePaymentmethod(method.label, data);
                                        setShowModal({
                                          show: true,
                                          type: method.label,
                                          rowData: data,
                                        });
                                      }}
                                    />
                                  </>
                                );
                              })}
                            </div>
                            <Button
                              variant="primary"
                              onClick={(e) => {
                                setShowModal({ show: true, type: 'PaymentDetail', rowData: data });
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
                            disabled
                            value={data?.transaction_or_check_number}
                          />
                        </td>
                        <td>
                          <SelectDropdown
                            optionsData={payment_status}
                            selectedValue={data?.payment_status}
                            rowData={data}
                            placeholder="Payment Status"
                            label="Payment Status"
                            id="PaymentStatus"
                            handleSelect={UpdateData.handlePaymentStatus}
                          />
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({
                                show: true,
                                type: 'Permission',
                                rowData: data,
                                campaign: CampaignInventoryList?.campaign,
                              });
                            }}
                          >
                            View/Add
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              setShowModal({
                                show: true,
                                type: 'Receipt',
                                rowData: data,
                                campaign: CampaignInventoryList?.campaign,
                              });
                            }}
                          >
                            View/Add
                          </Button>
                        </td>
                        <td></td>
                        <td>
                          <div className="mb-3 b-form-maindiv">
                            {[
                              { label: 'Completed', checked: true },
                              { label: ' Not Completed', checked: false },
                            ].map((item, index) => {
                              return (
                                <>
                                  <Form.Check
                                    inline
                                    key={index + item.label}
                                    label={item.label}
                                    name={`completed${data?.id}`}
                                    type="radio"
                                    id="completed"
                                    defaultChecked={
                                      item.label === 'Completed'
                                        ? data?.is_completed === true
                                          ? true
                                          : false
                                        : data?.is_completed === false
                                        ? true
                                        : false
                                    }
                                    value={item.label}
                                    onChange={(e) => {
                                      UpdateData.handleCompletionStatus(item.checked, data);
                                    }}
                                  />
                                </>
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          <Button variant="danger" className="btn btn-danger">
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="success"
                            className="btn btn-success"
                            onClick={(e) => {
                              BookingApi.updateCampaignInventories([data]);
                            }}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                {(!CampaignInventoryList.shortlisted_suppliers ||
                  CampaignInventoryList.shortlisted_suppliers.length < 0) && <DataNotFound />}
              </tbody>
            </Table>
          </div>
        )}
        {CampaignInventoryList &&
          CampaignInventoryList.shortlisted_suppliers &&
          CampaignInventoryList.total_count > 10 && (
            <ReactPagination
              pageNo={filterData.pageNo}
              pageSize={10}
              totalItems={CampaignInventoryList.total_count}
              onPageChange={handlePageChange}
            />
          )}
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
              <SelectDropdown
                optionsData={[{ label: 'All', value: 'ALL' }]}
                selectedValue={filterData?.supplier_type_code}
                placeholder="Supplier Type"
                label="Supplier Type"
                id="SupplierType"
                handleSelect={(e) => {
                  setFilterData({
                    ...filterData,
                    supplier_type_code: e?.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Booking Status</Form.Label>
              <SelectDropdown
                optionsData={bookingStatus}
                selectedValue={filterData?.booking_status_code}
                placeholder="Booking Status"
                label="Booking Status"
                id="BookingStatus"
                handleSelect={(e) =>
                  setFilterData({ ...filterData, booking_status_code: e?.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Phases</Form.Label>
              <SelectDropdown
                optionsData={supplierPhaseList}
                selectedValue={filterData?.phase_id}
                placeholder="Select Phase"
                label="Select Phase"
                id="SelectPhase"
                handleSelect={(e) => {
                  setFilterData({
                    ...filterData,
                    phase_id: e?.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>User</Form.Label>
              <SelectDropdown
                optionsData={[
                  { label: 'user1', value: 1 },
                  { label: 'User2', value: 2 },
                ]}
                selectedValue={filterData?.assigned}
                placeholder="Select User"
                label="Select User"
                id="SelectUser"
                handleSelect={(e) => {
                  setFilterData({
                    ...filterData,
                    assigned: e?.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Next Action Date</Form.Label>
              {/* <Form.Control type="date" placeholder="Enter email" /> */}
              <DateRangePickerCommon
                handleDateChange={(dates) => {
                  setFilterData({ ...filterData, start_date: dates[0], end_date: dates[1] });
                }}
                startDate={filterData?.start_date}
                endDate={filterData?.end_date}
              />
            </Form.Group>
            <div className="filter-action-wrapper">
              <Button
                variant="secondary"
                type="button"
                onClick={(e) => {
                  setFilterShow(!filterShow);
                }}
              >
                Back
              </Button>

              <Button
                variant="info"
                type="button"
                onClick={(e) => {
                  setFilterData({
                    pageNo: 0,
                    supplier_type_code: 'ALL',
                    search: '',
                    booking_status_code: '',
                    phase_id: '',
                    assigned: '',
                    start_date: '',
                    end_date: '',
                  });
                }}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={(e) => {
                  getCampaignInventories(filterData);
                }}
              >
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
            // className="booking-modal"
            className={`booking-modal ${
              showModal.type == 'ContactDetails' ? 'contact-detail-modal' : ''
            }`}
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
                  : showModal.type == 'externalComments'
                  ? 'Comments'
                  : showModal.type == 'PaymentDetail'
                  ? 'Payment Detail'
                  : showModal.type == 'Permission'
                  ? 'Permission Box Image Details'
                  : showModal.type == 'Receipt'
                  ? 'Receipt Box Image Details'
                  : showModal.type == 'ViewPhase'
                  ? 'View Phase'
                  : showModal.type == 'AddSupplier'
                  ? 'Add New Supplier'
                  : showModal.type == 'ImportSheet'
                  ? 'Import Sheet'
                  : showModal.type == 'Inventory'
                  ? 'Inventories'
                  : showModal.type == 'NEFT'
                  ? `NEFT Details For ${showModal.rowData?.name}`
                  : showModal.type == 'CHEQUE'
                  ? `Cheque Details For ${showModal.rowData?.name}`
                  : 'Other'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showModal.type == 'Add-Brand' ? (
                <AddBrandModal data={showModal.rowData} />
              ) : showModal.type == 'RelationshipData' ? (
                <RelationshipModal data={showModal.rowData} />
              ) : showModal.type == 'AssignUser' ? (
                <AssignUserModal data={showModal.rowData} campaign={showModal.campaign} />
              ) : showModal.type == 'ContactDetails' ? (
                <ContactDetailModal data={showModal.rowData} />
              ) : showModal.type == 'externalComments' || showModal.type == 'internalComments' ? (
                <CommentModal data={showModal.rowData} commentType={showModal.type} />
              ) : showModal.type == 'PaymentDetail' ? (
                <PaymentDetailModal data={showModal.rowData} />
              ) : showModal.type == 'Permission' || showModal.type == 'Receipt' ? (
                <PermissionModal
                  data={showModal.rowData}
                  campaign={showModal.campaign}
                  modalType={showModal.type}
                />
              ) : showModal.type == 'ViewPhase' ? (
                <ViewPhaseModal />
              ) : showModal.type == 'AddSupplier' ? (
                <AddSupplierModal />
              ) : showModal.type == 'ImportSheet' ? (
                <ImportSheetModal />
              ) : showModal.type == 'Inventory' ? (
                <InventoryModal />
              ) : showModal.type == 'NEFT' || showModal.type == 'CHEQUE' ? (
                <PaymentTypeModal data={showModal.rowData} modalType={showModal.type} />
              ) : (
                ''
              )}
            </Modal.Body>
          </Modal>
        </div>

        <div className="bottom-btn-strip">
          <ul>
            <li>
              <Button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  setShowModal({ show: true, type: 'ViewPhase' });
                }}
              >
                View / Add Phase
              </Button>
            </li>
            <li>
              <Button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  setShowModal({ show: true, type: 'AddSupplier' });
                }}
              >
                Add Suppliers
              </Button>
            </li>
            <li>
              <Button className="btn btn-success" type="button" variant="success">
                Update
              </Button>
            </li>
            <li>
              <Button className="btn btn-primary" type="button">
                Campaign Release and Audit Plan
              </Button>
            </li>
            <li>
              <Button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  setShowModal({ show: true, type: 'ImportSheet' });
                }}
              >
                Import Sheet
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
