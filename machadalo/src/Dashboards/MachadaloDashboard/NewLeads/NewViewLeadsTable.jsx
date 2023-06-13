import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import CommonTable from '../../Table/CommonTable';
import {
  LeadByCampaignsAtom,
  ClientStatusAtom,
  NewLeadTabFilterAtom,
} from '../../_states/Machadalo/newLeads';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilValue, useRecoilState } from 'recoil';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSortDown, BsSearch, BsSortUp } from 'react-icons/bs';
import Paginations from '../../Pagination';
import DateFilter from '../../common/date-range-filter/dateFilter';
import CommentModal from '../../common/Modals/CommentModal';

export default function NewViewLeadsTable({ Data }) {
  const CampaignData = Data;
  const LeadsByCampaign = useRecoilValue(LeadByCampaignsAtom);
  const clientStatuslist = useRecoilValue(ClientStatusAtom);
  const [filters, setFilters] = useRecoilState(NewLeadTabFilterAtom);
  const NewLeadAction = newLeadActions();
  const [paginationData, setPaginationData] = useState({
    pageNo: 1,
  });
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

  const handlePageChange = async (event, value) => {
    setFilters({ ...filters, leadSearch: '' });
    setPaginationData({
      pageNo: value,
    });
    let params = { ...filters, next_page: value - 1 };
    params.leadSearch = '';
    await NewLeadAction.getLeadByCampaignId(params);
  };
  const openCommentModal = async (row) => {
    setshowHideModal({
      ...showHideModal,
      comment: { show: true, tableName: 'LeadDetail', data: row[0] },
    });
    let params = {
      comment_type: 'all',
      _id: row[0]._id,
      requirement_id: row[0].requirement_id,
    };
    await NewLeadAction.getCommentListByIds(params);
  };
  const onSearch = async (e) => {
    let data = { ...filters, leadSearch: e.target.value, next_page: 0 };
    setFilters({ ...filters, leadSearch: e.target.value });
    if (e.target.value != '' && e.target.value.length > 2) {
      await NewLeadAction.getLeadByCampaignId(data);
    }
    if (!e.target.value || e.target.value === '') {
      let data = { ...filters, leadSearch: '', next_page: 0 };
      await NewLeadAction.getLeadByCampaignId(data);
    }
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

  const AcceptDeclineLeads = async (data, status) => {
    let obj = [{ client_status: status, requirement_id: data?.requirement_id, _id: data?._id }];
    await NewLeadAction.acceptDeclineLeads(obj);
  };
  return (
    <>
      <div className="text-center">
        <h4 className="table-head">{CampaignData?.name?.toUpperCase()}</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>

        <div className="searchbox">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              value={filters.leadSearch}
              onChange={(e) => {
                onSearch(e);
              }}
            />
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      {/* <DateFilter onDateChange={getDates} /> */}
      <Table striped bordered hover className="leads-table basic-leads">
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
                <td className="lead-dropdown">
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
                <td className="lead-btn-main">
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={(e) => AcceptDeclineLeads(row[0], 'Accept')}
                  >
                    Accept
                  </Button>
                  <br />
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={(e) => AcceptDeclineLeads(row[0], 'Decline')}
                    disabled={row[0]?.client_status === 'Decline'}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {console.log(LeadsByCampaign)}
      <Paginations
        pageSize={20}
        totalItems={LeadsByCampaign.length}
        pageNo={paginationData.pageNo}
        onPageChange={handlePageChange}
      />

      <CommentModal />

      {/* <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

<div class="container" id="no-more-tables">
  <p>&nbsp;</p>
  <table class="table table-hover">
    <thead>
      <tr class="active">
        <th class="col-xs-2"><strong>WO Ref</strong></th>
        <th class="col-xs-2"><strong>Reported</strong></th>
        <th class="col-xs-6"><strong>Type</strong></th>
        <th class="col-xs-2"><strong>Completed</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr role="button" data-toggle="collapse" href="#demo1" aria-expanded="false" aria-controls="demo1">
        <td data-title="WO Ref">12345</td>
        <td data-title="Reported">12/05/2015</td>
        <td data-title="Type">A plumbing job</td>
        <td data-title="Completed">01/06/2015</td>
      </tr>
      <tr>
        <td colspan="6" class="hiddenRow">
          <div class="collapse" id="demo1">
            <table class="table table-nested">
              <tbody>
                <tr>
                  <td class="col-xs-4 col-sm-2 active"><strong>Description</strong></td>
                  <td>07777 123456 ferroli flashing fault 37 no htg or hot water gas boiler no alt form of hot water</td>
                </tr>
                <tr>
                  <td class="col-xs-4 col-sm-2 active"><strong>Action taken</strong></td>
                  <td>
                    The work was completed by the contractor on 04-FEB-2013
                  </td>
                </tr>
                <tr>
                  <td class="col-xs-4 col-sm-2 active"><strong>Contractor name</strong></td>
                  <td>
                    PMD North West
                  </td>
                </tr>
                <tr>
                  <td class="col-xs-4 col-sm-2 active" rowspan="2"><strong>Job lines</strong></td>
                  <td>
                    1. Gutter:Clean/Flush Out(Per Elev) Gutter
                  </td>
                </tr>
                <tr>
                  <td>
                    2. Inspection:Provide/Erect Ladder Inspection
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr role="button" data-toggle="collapse" href="#demo2" aria-expanded="false" aria-controls="demo2">
        <td data-title="WO Ref">67890</td>
        <td data-title="Reported">20/04/2015</td>
        <td data-title="Type">An electrical job</td>
        <td data-title="Completed">01/05/2015</td>
      </tr>
      <tr>
        <td colspan="6" class="hiddenRow">
          <div class="collapse" id="demo2">
            <table class="table">
              <tbody>
                <tr>
                  <td class="col-xs-4 col-sm-2 active"><strong>Description</strong></td>
                  <td>07777 123456 ferroli flashing fault 37 no htg or hot water gas boiler no alt form of hot water</td>
                </tr>
                <tr>
                  <td class="col-xs-4 col-sm-2 active"><strong>Action taken</strong></td>
                  <td>
                    The work was completed by the contractor on 04-FEB-2013
                  </td>
                </tr>
                <tr>
                  <td class="col-xs-4 col-sm-2 active"><strong>Contractor name</strong></td>
                  <td>
                    PMD North West
                  </td>
                </tr>
                <tr>
                  <td class="col-xs-4 col-sm-2 active" rowspan="2"><strong>Job lines</strong></td>
                  <td>
                    1. Gutter:Clean/Flush Out(Per Elev) Gutter
                  </td>
                </tr>
                <tr>
                  <td>
                    2. Inspection:Provide/Erect Ladder Inspection
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div> */}
    </>
  );
}
