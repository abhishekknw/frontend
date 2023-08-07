import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
  BsFillEyeFill,
  BsSearch,
  BsSortDown,
} from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideModalAtom } from '../_states';
import LeadDetailModal from '../common/Modals/LeadDetailModal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactPagination from '../Pagination/Pagination';
import SearchBox from '../common/search/SearchBox';
import SelectDropdown from '../common/SelectDropdown/SelectDropdown';

export default function ViewLeadDetailTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };

  const clientStatusList = [
    { label: 'Lead Verified By Machadalo', value: 1 },
    { label: 'Lead Verified By Client', value: 2 },
    { label: 'Not a decision Maker', value: 3 },
    { label: 'Meeting Confirmed', value: 4 },
    { label: 'Meeting Completed', value: 5 },
  ];

  const [headerData, setheaderData] = React.useState([
    {
      name: 'S.No.',
      key: 'index',
    },
    {
      name: 'ENTITY NAME	',
      key: 'entity_name',
    },

    {
      name: 'ENTITY TYPE',
      key: 'start_date',
    },
    {
      name: 'PRIMARY COUNT',
      key: 'supplier_count',
      sortIcon: { show: true, direction: <BsSortDown /> },
    },
    {
      name: 'LEAD SOURCE',
      key: 'View Leads',
    },
    {
      name: 'ORGANIZATION NAME',
      key: 'Action',
    },
    {
      name: 'date of lead',
      key: 'Action',
      sortIcon: { show: true, direction: <BsSortDown /> },
    },
    {
      name: 'STATUS',
      key: 'Action',
    },
    {
      name: 'REVENUE EARNED',
      key: 'Action',
    },
    {
      name: 'ACTION	',
      key: 'Action',
    },
  ]);
  function handleSearch(e) {
    console.log(e, '21344234');
  }

  function handleSelect(e) {
    console.log(e, '11111111111');
  }
  return (
    <>
      <LeadDetailModal />
      <div className="row pb-2 filter-box">
        <div className="col-md-6  d-flex ">
          <div className="me-2">
            <SearchBox onSearch={handleSearch} />
          </div>
          {/* <InputGroup className="me-2">
            <Form.Control placeholder="Search" aria-label="Search" />
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
          </InputGroup> */}
          <div className="campaign-list-dropdown">
            {/* <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-second">
                Select Status
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Lead Verified By Machadalo</Dropdown.Item>
                <Dropdown.Item>Lead Verified By Client</Dropdown.Item>
                <Dropdown.Item>Not a Decision Maker</Dropdown.Item>
                <Dropdown.Item>Meeting Confirmed</Dropdown.Item>
                <Dropdown.Item>Meeting Completed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <SelectDropdown
              optionsData={clientStatusList}
              selectedValue={1}
              placeholder="Client Status"
              label="Client Status"
              id="ClientStatus"
              handleSelect={handleSelect}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="searchbox count-range d-flex">
            <p>Primary Count:</p>
            <InputGroup className="me-2">
              <Form.Control placeholder="Start" aria-label="Start" />
            </InputGroup>
            <InputGroup className="">
              <Form.Control placeholder="End" aria-label="Start" />
            </InputGroup>
          </div>
        </div>
      </div>
      {/* <h4 style={{ paddingTop: '10px' }}>Leads Table</h4> */}
      <Table striped bordered hover className="leads-table mobile-table">
        <Thead className="leads-tbody">
          <Tr>
            {headerData.map((item, index) => {
              return (
                <Th key={index}>
                  {item.name} <span>{item?.sortIcon?.direction}</span>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          <Tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <Td>1</Td>
            <Td>CPWD Colony 2</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>FOS</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>ganshyam test society</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Test aman society</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>4</Td>
            <Td>Maple Leaves Residency</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td>Maple Leaves Residency</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>6</Td>
            <Td>Maple Leaves Residency</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>7</Td>
            <Td>Maple Leaves Residency</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>8</Td>
            <Td>Maple Leaves Residency</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>9</Td>
            <Td>Maple Leaves Residency</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
          <Tr>
            <Td>10</Td>
            <Td>Akash Apartment</Td>
            <Td>RS</Td>
            <Td>300</Td>
            <Td>RM</Td>
            <Td>Machadalo</Td>
            <Td>2023-02-01 13:57:15</Td>
            <Td>
              <Dropdown className="table-dropdown-status">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Leads Verified by Machadalo
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 1</Dropdown.Item>
                  <Dropdown.Item href="#">Ringing Not Responding 2</Dropdown.Item>
                  <Dropdown.Item href="#">Meeting Confirmed</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Td>
            <Td>20k</Td>
            <Td>
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                  }}
                >
                  <BsFillEyeFill />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, email: { show: true } });
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <ReactPagination
        pageNo={page}
        pageSize={10}
        totalItems={100}
        onPageChange={handlePageChange}
      />
    </>
  );
}
