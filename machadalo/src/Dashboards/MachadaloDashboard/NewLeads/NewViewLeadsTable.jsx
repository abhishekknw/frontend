import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import CommonTable from '../../Table/CommonTable';
import { LeadByCampaignsAtom, ClientStatusAtom } from '../../_states/Machadalo/newLeads';
import {showHideModalAtom } from '../../_states/Constant';
import { useRecoilValue,useRecoilState } from 'recoil';
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

export default function NewViewLeadsTable({ Data }) {
  const CampaignData = Data;
  const LeadsByCampaign = useRecoilValue(LeadByCampaignsAtom);
  const clientStatuslist = useRecoilValue(ClientStatusAtom);
  const NewLeadAction = newLeadActions();
  const [paginationData, setPaginationData] = useState({
    pageNo: 1,
  });
  // const [showHideModal, setshowHideModal] = useState({
  //   CommentModal: false,
  // });
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

  const handlePageChange = (event, value) => {
    setPaginationData({
      pageNo: value,
    });
  };
  const openCommentModal = async(row) => {
    setshowHideModal({
      ...showHideModal,
      comment: { show: true, tableName: 'LeadDetail', data: row },
    });
    console.log(row,"1111111111")
    let params = 
      {
        comment_type: 'all',
        _id: '63107c31b3cf3b1a2a78f580',
        requirement_id: 7451,
      }
    await NewLeadAction.getCommentListByIds(params);

  };
  const onComment = () => {
    // setshowHideModal({ CommentModal: false });
  };

  const handleSelect = async (status, row) => {
    let object = [
      {
        macchadalo_client_status: status,
        _id: row[0]?._id,
        requirement_id: row[0]?.requirement_id,
      },
    ];
    await NewLeadAction.updateClientStatus(object);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <div>
          <h4>{CampaignData?.name}</h4>
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
            <th>Comment</th>
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
                  <Dropdown className="table-dropdown-status">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {row[0]?.macchadalo_client_status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {clientStatuslist &&
                        clientStatuslist.map((item, index) => {
                          return (
                            <Dropdown.Item
                              key={index}
                              eventKey={item.status_name}
                              onClick={(e) => {
                                handleSelect(item.status_name, row);
                              }}
                              active={item.status_name == row[0]?.macchadalo_client_status}
                            >
                              {item.status_name}
                            </Dropdown.Item>
                          );
                        })}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={(e) => {
                      openCommentModal(row);
                    }}
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
        // data={{ show: showHideModal.CommentModal }}
        // onSubmit={onComment}
        // onCancel={(e) => setshowHideModal({ CommentModal: false })}
      />
    </>
  );
}
