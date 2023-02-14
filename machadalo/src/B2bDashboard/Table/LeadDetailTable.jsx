import { useState } from 'react';
import ViewLeadDetail from './ViewLeadTable';
import * as React from 'react';
import { Button } from '@mui/material';
import DataGridTable from './DataGridTable';
import SendEmailModal from '../modals/sendEmailModal';
import DownloadLeadsModal from '../modals/DownloadLeadsModal';
import { useRecoilValue } from 'recoil';
import { currentCampaign } from '../API/_state';
import { LeadDetailActions } from '../API/_actions';

const LeadDetailTable = (props) => {
  const leadDetailApi = LeadDetailActions();
  const [showViewLeads, setShowViewLeads] = useState(false);
  const allCampaingn = useRecoilValue(currentCampaign);

  async function viewCampaignLeads(e, data) {
    await leadDetailApi.campaignViewLeads();
    console.log(e, data);
  }

  const columns = [
    {
      field: 'unique',
      headerName: 'Index',
      sortable: false,
      width: 70,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 2,
    },
    { field: 'name', headerName: 'Camaign Name', sortable: false, width: 130 },
    { field: 'start_date', headerName: 'Start Date', width: 130 },
    { field: 'supplier_count', headerName: 'Supplier Count', type: 'number', width: 90 },
    {
      field: 'ViewLeads',
      headerName: 'View Leads	',
      description: 'View Leads',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              viewCampaignLeads(e, params);
            }}
          >
            View Leads
          </Button>
        </strong>
      ),
    },
    {
      field: 'EmailLeads',
      headerName: 'View Leads	',
      description: 'Send Emails',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <SendEmailModal data={params} />
        </>
      ),
    },
    {
      field: 'DownloadLeads',
      headerName: 'View Leads	',
      description: 'Download Leads',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <DownloadLeadsModal data={params} />
        </>
      ),
    },
    {
      field: 'CreateField',
      headerName: 'View Leads	',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              handleShow(params);
            }}
          >
            Create Field
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <>
      <DataGridTable
        row={allCampaingn}
        columns={columns}
        styles={{ height: 400, width: '100%' }}
        classNames="small-height-table data-b2b-table"
      />
      {showViewLeads && <ViewLeadDetail />}
    </>
  );
};

export default LeadDetailTable;
