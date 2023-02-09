import React, { useState } from 'react';
import { get } from 'lodash';
// import '../bootstrap-iso.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewComment from '../modals/ViewComment';
import ViewLeadTable from './ViewLeadTable';
const LeadDetailTable = (props) => {
  const [showViewLeads, setShowViewLeads] = useState(false);
  const data = [
    {
      campaign_id: 'KRIKRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRIKRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRIKRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRIKRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRIKRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
  ];
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function viewButtons(cell, row) {
    return (
      <>
        <Button onClick={(e) => setShowViewLeads(true)}>View Leads</Button>
        <br />
      </>
    );
  }
  function EmailButton(cell, row) {
    return (
      <>
        <Button>Email Leads</Button>
        <br />
      </>
    );
  }
  function DownloadButton(cell, row) {
    return (
      <>
        <Button>Download Leads</Button>
        <br />
      </>
    );
  }
  function CreateButton(cell, row) {
    return (
      <>
        <Button>Create Fields</Button>
        <br />
      </>
    );
  }
  function indexNum(cell, row, enumObject, index) {
    return <div>{index + 1}</div>;
  }
  return (
    <>
      <div className="bootstrap-iso">
        <BootstrapTable data={data} striped={true}>
          <TableHeaderColumn isKey dataField="campaign_id" dataFormat={indexNum}>
            Index
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Campaign Name</TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'start_date' }}
            dataField="start_date"
            dataSort={true}
            searchable={false}
          >
            Start Date{' '}
          </TableHeaderColumn>
          <TableHeaderColumn dataField="supplier_count" dataSort={true} searchable={false}>
            Supplier Count
          </TableHeaderColumn>
          <TableHeaderColumn tdAttr={{ 'data-attr': 'area' }} dataFormat={viewButtons}>
            View Leads{' '}
          </TableHeaderColumn>
          <TableHeaderColumn tdAttr={{ 'data-attr': 'Client Comment' }} dataFormat={EmailButton}>
            Email Leads{' '}
          </TableHeaderColumn>
          <TableHeaderColumn tdAttr={{ 'data-attr': 'Action' }} dataFormat={DownloadButton}>
            Download Leads{' '}
          </TableHeaderColumn>
          <TableHeaderColumn tdAttr={{ 'data-attr': 'Action' }} dataFormat={CreateButton}>
            Create Field
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewComment />
          </Modal.Body>
        </Modal>
      </div>
      {showViewLeads && <ViewLeadTable />}
    </>
  );
};

export default LeadDetailTable;
