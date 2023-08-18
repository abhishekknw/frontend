import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TableHeader from '../../Table/TableHeader/TableHeader';
import { CampaignListActions } from '../../_actions/CampaignPlanning/campaignList.action';
import SearchBox from '../../common/search/SearchBox';
import { CampaignListAtom, userInformationAtom } from '../../_states';
import { useRecoilValue } from 'recoil';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { Button } from 'react-bootstrap';
import './campaignList.css';
import ReactPagination from '../../Pagination/Pagination';
import dayjs from 'dayjs';
export default function CampaignList() {
  const CampaignListApi = CampaignListActions();
  const CampaignList = useRecoilValue(CampaignListAtom);
  const userInfo = useRecoilValue(userInformationAtom);
  const [filterData, setFilterData] = useState({
    to: userInfo?.id,
    include_assigned_by: 0,
    fetch_all: 0,
    next_page: 1,
    search: '',
  });
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
      sort: false,
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
        return <div>{dayjs(row?.created_at).format('DD-MM-YYYY')}</div>;
      },
    },
    {
      title: 'Start Date',
      accessKey: 'campaign.tentative_start_date',
      sort: false,
      action: function (row, index) {
        return <div>{dayjs(row?.campaign?.tentative_start_date).format('DD-MM-YYYY')}</div>;
      },
    },
    {
      title: 'End Date',
      accessKey: 'campaign.tentative_end_date',
      sort: false,
      action: function (row, index) {
        return <div>{dayjs(row?.campaign?.tentative_end_date).format('DD-MM-YYYY')}</div>;
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
        return <Link to={`booking-plan?campaignId=${row?.campaign?.proposal_id}`}>Details</Link>;
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

  const getCampaignList = async (filters) => {
    await CampaignListApi.getCampaignAssignment(filters);
  };
  const handlePageChange = (page) => {
    let filter = { ...filterData, next_page: page?.selected + 1 };
    getCampaignList(filter);
    setFilterData(filter);
  };

  useEffect(() => {
    getCampaignList(filterData);
  }, []);
  return (
    <>
      <TableHeader headerValue="Campaign List" />
      <div className="d-inline-flex search-block">
        <SearchBox />
        <div>
          <button className="btn btn-primary">Suspence Lead</button>
        </div>
      </div>
      {CampaignList && CampaignList?.list && (
        <ReactBootstrapTable
          className="campain-table"
          rowData={CampaignList?.list}
          headerData={CampaignHeader}
        />
      )}
      {CampaignList && CampaignList.list && CampaignList.count > 10 && (
        <ReactPagination
          pageNo={1}
          pageSize={10}
          totalItems={CampaignList.count}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
