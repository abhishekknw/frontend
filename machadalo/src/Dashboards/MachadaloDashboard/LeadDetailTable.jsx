import React, { useMemo } from 'react';
import Table from 'react-bootstrap/Table';
// import './index.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
  BsFillEyeFill,
  BsSearch,
} from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideModalAtom } from '../_states';
import LeadDetailModal from '../common/Modals/LeadDetailModal';
import Paginations from '../Pagination';
import EmailModal from '../common/Modals/EmailModal';
import WhatsappModal from '../common/Modals/WhatsappModal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ViewLeadDetailTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showTable, setshowTable] = React.useState({ first: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

  const onSendEmail = async (data, check) => {
    setshowHideModal({ EmailModal: false });
  };
  const openEmailModal = async (item) => {
    setshowHideModal({ ...showHideModal, EmailModal: true });
    // setshowHideModal({ ...showHideModal, email: { show: true } });
  };

  const OnshareWhatsApp = () => {
    setshowHideModal({ ...showHideModal, WhatsAppModal: false });
  };
  const openWhatsAppModal = () => {
    setshowHideModal({ ...showHideModal, WhatsAppModal: true });
  };
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <LeadDetailModal />
      <div className="row pb-2 filter-box">
        <div className="col-md-6 d-flex ">
          <InputGroup className="me-2">
            <Form.Control placeholder="Search" aria-label="Search" />
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
          </InputGroup>
          <div className="campaign-list-dropdown">
            <Dropdown>
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
            </Dropdown>
          </div>
        </div>
        <div className='col-md-6'>
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
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th>S.No.</th>
            <th>Entity Name</th>
            <th>Entity Type</th>
            <th>Primary Count</th>
            <th>Lead Source</th>
            <th>Organization Name</th>
            <th>date of lead</th>
            <th>Status</th>
            <th>Revenue Earned</th>
            {/* <th>View detail</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <td>1</td>
            <td>CPWD Colony 2</td>
            <td>RS</td>
            <td>300</td>
            <td>FOS</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            {/* <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={(e) => {
                  setshowHideModal({ ...showHideModal, leadDetail: { show: true } });
                }}
              >
                 View Detail 
              </Button>
            </td> */}
            <td>
              {/* <div className="action-icon">
                <span
                  onClick={(e) => {
                    openEmailModal();
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    openWhatsAppModal();
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div> */}
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
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>ganshyam test society</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            {/* <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={(e) => { setshowHideModal({ ...showHideModal, leadDetail: { show: true }, }) }}
              >
                View Detail
              </Button>
            </td> */}
            <td>
              {/* <div className="action-icon">
                <span
                  onClick={(e) => {
                    openEmailModal();
                  }}
                >
                  <BsEnvelopeFill />
                </span>
                <span>
                  <BsArrowDownCircle />
                </span>
                <span
                  onClick={(e) => {
                    openWhatsAppModal();
                  }}
                >
                  <BsWhatsapp />
                </span>
              </div> */}
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
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Test aman society</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Maple Leaves Residency</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Maple Leaves Residency</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Maple Leaves Residency</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Maple Leaves Residency</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Maple Leaves Residency</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>Maple Leaves Residency</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Akash Apartment</td>
            <td>RS</td>
            <td>300</td>
            <td>RM</td>
            <td>Machadalo</td>
            <td>2023-02-01 13:57:15</td>
            <td>
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
            </td>
            <td>20k</td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <EmailModal
        data={{
          show: showHideModal.EmailModal,
          dropdownOptions: [
            { status_name: 'Lead verified by Machadalo' },
            { status_name: 'Lead verified by Machadalo' },
          ],
        }}
        onSubmit={onSendEmail}
        onCancel={(e) => setshowHideModal({ ...showHideModal, EmailModal: false })}
      />
      <WhatsappModal
        data={{
          show: showHideModal.WhatsAppModal,
        }}
        onSubmit={OnshareWhatsApp}
        onCancel={(e) => setshowHideModal({ ...showHideModal, WhatsAppModal: false })}
      /> */}
      <Paginations pageSize={10} totalItems={100} pageNo={page} onPageChange={handlePageChange} />
    </>
  );
}
