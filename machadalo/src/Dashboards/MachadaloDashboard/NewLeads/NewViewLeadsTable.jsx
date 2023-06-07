import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import CommonTable from '../../Table/CommonTable';
import { LeadByCampaignsAtom } from '../../_states/Machadalo/newLeads';
import { useRecoilValue } from 'recoil';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
  BsSearch,
} from 'react-icons/bs';
import Paginations from '../../Pagination';
import DateFilter from '../../common/date-range-filter/dateFilter';
import CommentModal from '../../common/Modals/CommentModal';
export default function NewViewLeadsTable(props) {
  const LeadsByCampaign = useRecoilValue(LeadByCampaignsAtom);
  const [paginationData, setPaginationData] = useState({
    pageNo: 1,
  });
  const [showHideModal, setshowHideModal] = useState({
    CommentModal: false,
  });
  function getDates(date) {
    console.log(date);
  }
  const handlePageChange =  (event, value) => {
    setPaginationData({
      pageNo: value,
    });
  };
  const openCommentModal =  () => {
    setshowHideModal({ CommentModal: true });
    // setshowHideModal({ ...showHideModal, email: { show: true } });
  }
  const onComment =  () => {
    setshowHideModal({ CommentModal: false });
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <div>
          <h4>Customer Table</h4>
        </div>
        <div className="searchbox">
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search" aria-label="Search" />
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      {/* <DateFilter onDateChange={getDates} /> */}
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th>S.No.</th>
            {LeadsByCampaign?.header &&
              Object.keys(LeadsByCampaign?.header)?.map((key) => {
                return <th key={key}>{LeadsByCampaign?.header[key]}</th>;
              })}
            <th>Current Status</th>
            <th>Client Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {LeadsByCampaign?.values.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                {row.map((data, index) => (index != 0 ? <td key={index}>{data?.value}</td> : null))}
                <td>
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
                </td>
                <td>
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={(e) => { openCommentModal(row) }}

                  >
                    Comment
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={() => getLeadsByCampaign(item)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={() => getLeadsByCampaign(item)}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paginations
        pageSize={20}
        totalItems={LeadsByCampaign.length}
        pageNo={paginationData.pageNo}
        onPageChange={handlePageChange}
      />

      <CommentModal
        data={{ show: showHideModal.CommentModal }}
        onSubmit={onComment}
        onCancel={(e) => setshowHideModal({ CommentModal: false })}
      />
    </>
  );
}
