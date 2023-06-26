import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { DecisionBoardActions } from '../../_actions/CampaignPlanning/decisionBoard.actions';
export default function CampaignDecisionBoard() {
  const DecisionBoard = DecisionBoardActions();
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
      key: 'start_date',
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
      name: 'Edit Details	',
      key: 'Action',
    },
    {
      name: 'Comments',
      key: 'Action',
    },
  ]);
React.useEffect(()=>{
  DecisionBoard.GetInvoiceProposals();
})

  return (
    <div>
      <Table striped bordered hover className="leads-table ">
        <Thead className="leads-tbody">
          <Tr>
            {headerData.map((item,index)=>{
              return (
                <Th key={index}>{item.name} <span>{item?.sortIcon?.direction}</span></Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
            <Tr>

            </Tr>
        </Tbody>
       </Table> 
    </div>
  );
}
