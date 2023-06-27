import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { DecisionBoardActions } from '../../_actions';
import { InvoiceProposalsAtom } from '../../_states';
import { useRecoilValue } from 'recoil';
import Form from 'react-bootstrap/Form';
import dayjs from 'dayjs';
import SearchBox from '../../common/search/SearchBox';
import Paginations from '../../Pagination';
export default function CampaignDecisionBoard() {
  const DecisionBoard = DecisionBoardActions();
  const [filters, setFilters] = React.useState({ search: '', pageNo: 1 });
  const InvoiceProposalList = useRecoilValue(InvoiceProposalsAtom);
  const [headerData, setheaderData] = React.useState([
    {
      name: 'S.No.',
      key: 'index',
    },
    {
      name: 'Proposal Id	',
      key: 'proposal_id',
    },

    {
      name: 'Proposal Name',
    },
    {
      name: 'Proposal For',
      key: 'supplier_count',
    },
    {
      name: 'Proposal Created By',
      key: 'View Leads',
    },
    {
      name: 'Invoice Number',
      key: 'Action',
    },
    {
      name: 'Start Date',
      key: 'Action',
      //   sortIcon: { show: true, direction: <BsSortDown /> },
    },
    {
      name: 'End Date',
      key: 'Action',
      //   sortIcon: { show: true, direction: <BsSortDown /> },
    },
    {
      name: 'Create Campaign',
      key: 'Action',
    },
    {
      name: 'Assigned To	',
      key: 'Action',
    },
    {
      name: 'Type of End Customer',
      key: 'Action',
    },
    {
      name: 'Edit Details	',
      key: 'Action',
    },
    {
      name: 'Comments',
      key: 'Action',
    },
  ]);
  async function handlePageChange(e, page) {
    let data = { ...filters, pageNo: page };
    setFilters(data);
    await DecisionBoard.GetInvoiceProposals(data);
  }

  async function handleSearch(e) {
    let data = { search: e.target.value, pageNo: 1 };
    setFilters(data);
    if (data.search.length > 2 || data.search == '') {
      await DecisionBoard.GetInvoiceProposals(data);
    }
  }

  async function convertCampaignToProposal(proposal) {
    await DecisionBoard.converCampaignToProposal(proposal);
  }
  async function convertProposalToCampaign(proposal) {
    await DecisionBoard.convertProposalToCampaign(proposal);
  }

  async function convertCampaignOnHold(proposal) {
    await DecisionBoard.convertCampaignOnHold(proposal);
  }

  React.useEffect(() => {
    DecisionBoard.GetInvoiceProposals(filters);
  }, []);

  return (
    <>
      <div className="text-center">
        <h4 className="table-head">{'Campaign Decision Board'.toUpperCase()}</h4>
      </div>
      <div>
        <SearchBox onSearch={handleSearch} />
        <br></br>
        <Table className="leads-table ">
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
            {InvoiceProposalList?.list?.map((data, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <a className="link">{data.proposal.proposal_id}</a>
                  </Td>
                  <Td>{data.proposal.name}</Td>
                  <Td>{data.proposal.account}</Td>
                  <Td>{data.proposal.created_by}</Td>
                  <Td>{data.proposal.invoice_number}</Td>
                  <Td>{dayjs(data.proposal.tentative_start_date).format('DD-MM-YYYY')}</Td>
                  <Td>{dayjs(data.proposal.tentative_end_date).format('DD-MM-YYYY')}</Td>
                  <Td>
                    <Form>
                      <Form.Check
                        label="Accept"
                        checked={data.proposal.campaign_state === 'PTC'}
                        type="radio"
                        onChange={(e) => {
                          convertProposalToCampaign(data);
                        }}
                      />
                      <Form.Check
                        label="Decline"
                        checked={data.proposal.campaign_state === 'PNC'}
                        type="radio"
                        onChange={(e) => {
                          convertCampaignToProposal(data);
                        }}
                      />
                      <Form.Check
                        type="radio"
                        label="OnHold"
                        checked={data.proposal.campaign_state === 'POH'}
                        onChange={(e) => {
                          convertCampaignOnHold(data);
                        }}
                      />
                    </Form>
                  </Td>
                  <Td>
                    {data.proposal.campaign_state === 'PTC' &&
                      data.assignment_detail.assigned_to != 'Nobody' &&
                      data?.assignment_detail.map((assign, index) => {
                        return (
                          <>
                            <span key={index}>{assign.assigned_to.assigned_to_name}</span>
                            <br></br>
                          </>
                        );
                      })}
                    {(data.proposal.campaign_state !== 'PTC' ||
                      data.assignment_detail.assigned_to == 'Nobody') && <span>NA</span>}
                  </Td>
                  <Td>
                    {data.proposal.type_of_end_customer_name
                      ? data.proposal.type_of_end_customer_name
                      : 'NA'}
                  </Td>
                  <Td>
                    <a className="link">Edit Details</a>
                  </Td>
                  <Td>
                    <a className="link">View/Add</a>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {InvoiceProposalList.count > 10 && (
          <Paginations
            pageSize={10}
            totalItems={InvoiceProposalList?.count}
            pageNo={InvoiceProposalList?.current_page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
