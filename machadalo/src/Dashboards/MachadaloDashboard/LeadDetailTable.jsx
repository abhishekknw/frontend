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
} from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideModalAtom } from '../_states';
import LeadDetailModal from '../common/Modals/LeadDetailModal';
import { GrFormView } from 'react-icons/gr';
import Paginations from '../Pagination';
import EmailModal from '../common/Modals/EmailModal';
import WhatsappModal from '../common/Modals/WhatsappModal';


export default function ViewLeadDetailTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showTable, setshowTable] = React.useState({ first: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideModal, setshowHideModal] = React.useState({
    EmailModal: false,
    WhatsAppModal: false,
  });

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
      {/* <h4 style={{ paddingTop: '10px' }}>Leads Table</h4> */}
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th></th>
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
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              {isExpandRow.b2b && <BsChevronUp />}
              {!isExpandRow.b2b && <BsChevronDown />}
            </td>
            <td>01</td>
            <td>Name 1</td>
            <td>RS</td>
            <td>300</td>
            <td>FOS</td>
            <td>Machadalo</td>
            <td>12/12/2020</td>
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
              <div className="action-icon">
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
              </div>
            </td>
          </tr>
          {isExpandRow.b2b && (
            <tr>
              <td colSpan={12} className="nested-leads-table-colspan ">
                <Table striped bordered hover className="nested-leads-table ">
                  <thead className="leads-tbody">
                    <tr>
                      <th>S.No.</th>
                      <th>Lead Source</th>
                      <th>Total Lead Count Shared</th>
                      <th>Lead accepted by QA</th>
                      <th>Lead Accepted by Client</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.1</td>
                      <td>FOS</td>
                      <td>5000</td>
                      <td>2500</td>
                      <td>2000</td>
                      <td>
                        <div className="action-icon">
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
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>2.1</td>
                      <td>RM</td>
                      <td>5000</td>
                      <td>2500</td>
                      <td>2000</td>
                      <td>
                        <div className="action-icon">
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
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          )}

          <tr>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              <BsChevronDown />{' '}
            </td>
            <td>01</td>
            <td>Name 1</td>
            <td>RS</td>
            <td>300</td>
            <td>FOS</td>
            <td>Machadalo</td>
            <td>12/12/2020</td>
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
              <div className="action-icon">
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
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <EmailModal
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
      />
      <Paginations pageSize={10} totalItems={100} pageNo={page} onPageChange={handlePageChange} />
    </>
  );
}
