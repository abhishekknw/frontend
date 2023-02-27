import { useState } from 'react';
import ViewLeadDetail from './ViewLeadTable';
import * as React from 'react';
import { Button, Typography } from '@mui/material';
import DataGridTable from '../Table/DataGridTable';
import SendEmailModal from '../modals/sendEmailModal';
import DownloadLeadsModal from '../modals/DownloadLeadsModal';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentCampaign, viewLeadFilters } from '../API/_state';
import { LeadDetailActions } from '../API/_actions';
import CreateNewTemplate from '../modals/CreateNewTemplate';
const LeadDetailTable = (props) => {
  const leadDetailApi = LeadDetailActions();
  const [showViewLeads, setShowViewLeads] = useState(false);
  const allCampaingn = useRecoilValue(currentCampaign);
  const [filters, setFilters] = useRecoilState(viewLeadFilters);
  const [campaignData, setCampaignData] = useState({});

  async function viewCampaignLeads(e, data) {
    let filterData = {
      campaign_id: data.row?.campaign_id,
      lead_type: filters?.lead_type,
      supplier_type: filters?.supplier_type,
      next_page: filters?.next_page,
    };
    // filterData = { ...filterData, campaign_id: data.row.campaign_id };
    setFilters({ ...filters, campaign_id: data.row.campaign_id });
    setCampaignData(data?.row);
    await leadDetailApi.campaignViewLeads(filterData);
    await leadDetailApi.getCampaignCityList(filterData);
    setShowViewLeads(true);
  }

  const columns = [
    {
      field: 'unique',
      headerName: 'Index',
      sortable: false,
      width: 50,
      renderCell: (index) => index.api.getRowIndex(index.row.campaign_id) + 1,
    },
    {
      field: 'name',
      headerClassName: 'super-app-theme--header',
      headerName: 'View Leads',
      sortable: false,
      width: 140,
    },
    {
      field: 'start_date',
      headerClassName: 'super-app-theme--header',
      headerName: 'Start Date',
      width: 220,
    },
    {
      field: 'supplier_count',
      headerClassName: 'super-app-theme--header',
      headerName: 'Supplier Count',
      type: 'number',
      width: 120,
    },
    {
      field: 'ViewLeads',
      headerName: 'Campaign Name	',
      description: 'View Leads',
      sortable: false,
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            style={{}}
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
      headerName: 'Email Leads	',
      description: 'Send Emails',
      sortable: false,
      width: 130,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <>
          <SendEmailModal data={params} sendWithFilter={false} />
        </>
      ),
    },
    {
      field: 'DownloadLeads',
      headerName: 'Download Leads	',
      description: 'Download Leads',
      sortable: false,
      width: 180,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <>
          <DownloadLeadsModal data={params} />
        </>
      ),
    },
    {
      field: 'CreateField',
      headerName: 'Create Fields	',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <>
          <CreateNewTemplate data={params} />
        </>
      ),
    },
  ];

  return (
    <>
      <Typography>CURRENT CAMPAIGNS</Typography>
      <DataGridTable
        row={allCampaingn}
        columns={columns}
        styles={{ height: 400, width: '100%' }}
        classNames="small-height-table data-b2b-table center-data-table"
      />
      {showViewLeads && <ViewLeadDetail data={campaignData} />}
    </>
  );
};

export default LeadDetailTable;
