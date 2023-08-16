import React, { useEffect, useState } from 'react';
import TableHeader from '../../Table/TableHeader/TableHeader';
import { CampaignListActions } from '../../_actions/CampaignPlanning/campaignList.action';
import SearchBox from '../../common/search/SearchBox';
import { CampaignListAtom } from '../../_states';
import { useRecoilValue } from 'recoil';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { Button } from 'react-bootstrap';
import './campaignList.css';

export default function CampaignList() {
  const CampaignListApi = CampaignListActions();
  const CampaignList = useRecoilValue(CampaignListAtom);
  const [dataList, setDataList] = useState([]);
  const CampaignHeader = [
    {
      title: '#',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return index + 1;
      },
    },
    {
      title: 'Organisation/Account',
      accessKey: 'accountName',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            <span>{row?.accountOrganisationName}</span>
            {row?.accountName ? '/' : ''}
            <span>{row?.accountName}</span>
          </div>
        );
      },
    },
    {
      title: 'Brand Type',
      accessKey: 'action',
      sort: false,
      action: function (row, index) {
        return <Button>Brand</Button>;
      },
    },
    {
      title: 'Campaign Name',
      accessKey: 'campaign.name',
      sort: false,
      action: function (row, index) {
        return <div>{row?.campaign?.name}</div>;
      },
    },
    {
      title: 'Assigned To',
      accessKey: 'assigned_to',
      sort: true,
      action: function (row, index) {
        return <div>{row?.assigned[0]?.assigned_to}</div>;
      },
    },
    {
      title: 'Assigned By',
      accessKey: 'assigned_by',
      sort: false,
      action: function (row, index) {
        return <div>{row?.assigned[0]?.assigned_by}</div>;
      },
    },
    {
      title: 'Assigned Date',
      accessKey: 'created_at',
      sort: false,
      action: function (row, index) {
        return <div>{row?.created_at}</div>;
      },
    },
    {
      title: 'Start Date',
      accessKey: 'campaign.tentative_start_date',
      sort: false,
      action: function (row, index) {
        return <div>{row?.campaign?.tentative_start_date}</div>;
      },
    },
    {
      title: 'End Date',
      accessKey: 'campaign.tentative_end_date',
      sort: false,
      action: function (row, index) {
        return <div>{row?.campaign?.tentative_end_date}</div>;
      },
    },
    {
      title: 'Campaign Status',
      accessKey: 'campaign.status',
      sort: false,
      action: function (row, index) {
        return <div>{row?.campaign?.status}</div>;
      },
    },
    {
      title: 'Comments',
      accessKey: 'View/Add',
      sort: false,
      action: function (row, index) {
        return <a>View/Add</a>;
      },
    },
    {
      title: 'Booking Plan',
      accessKey: 'Details',
      sort: false,
      action: function (row, index) {
        return <a>Details</a>;
      },
    },
    {
      title: 'Release Plan',
      accessKey: 'Assign Dates',
      sort: false,
      action: function (row, index) {
        return <a>Assign Dates</a>;
      },
    },
    {
      title: 'Executed Image',
      accessKey: 'ViewImages',
      sort: false,
      action: function (row, index) {
        return <a>View</a>;
      },
    },
    {
      title: 'Download Campaign',
      accessKey: '1',
      sort: false,
      action: function (row, index) {
        return <a>Download</a>;
      },
    },
    {
      title: 'Email',
      accessKey: 'Email',
      sort: false,
      action: function (row, index) {
        return <a>Send</a>;
      },
    },
  ];

  async function getCampaignList() {
    let res = await CampaignListApi.getCampaignAssignment();
    setDataList(res);
  }

  useEffect(() => {
    getCampaignList();
  }, []);
  console.log(CampaignList, '1111111111');
  return (
    <>
      <TableHeader headerValue="Campaign List" />
      <SearchBox />
      {CampaignList && CampaignList?.list && (
        <ReactBootstrapTable rowData={CampaignList?.list} headerData={CampaignHeader} />
      )}
    </>
  );
}
