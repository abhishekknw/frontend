import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import CommonTable from '../../Table/CommonTable';
import { LeadByCampaignsAtom } from '../../_states/Machadalo/newLeads';
import { useRecoilValue } from 'recoil';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';

import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
} from 'react-icons/bs';
import Paginations from '../../Pagination';
export default function ViewLeadsTable(props) {
  const LeadsByCampaign = useRecoilValue(LeadByCampaignsAtom);
  console.log(LeadsByCampaign, 'LeadsByCampaign');
  return (
    <>
      <Table striped bordered hover className="dash-table">
        <thead>
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
                <td>{index +1}</td>
                {row.map((data, index) => (index != 0 ? <td key={index}>{data?.value}</td> : null))}
                <td>Dropdown</td>
                <td>
                  <Button
                    variant="outline-dark"
                    className="lead-btn"
                    onClick={() => getLeadsByCampaign(item)}
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
    </>
  );
}
