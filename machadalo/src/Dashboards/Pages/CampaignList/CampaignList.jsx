import React, { useEffect } from 'react';
import TableHeader from '../../Table/TableHeader/TableHeader';
import { CampaignListActions } from '../../_actions/CampaignPlanning/campaignList.action';
import SearchBox from '../../common/search/SearchBox';
import { CampaignListAtom } from '../../_states';
import { useRecoilValue } from 'recoil';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { Button } from 'react-bootstrap';
export default function CampaignList() {
  const CampaignListApi = CampaignListActions();
  const CampaignList = useRecoilValue(CampaignListAtom);
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
      accessKey: 'action',
      sort: true,
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
      accessKey: 'action',
      sort: true,
      action: function (row, index) {
        return <div>{row?.campaign?.name}</div>;
      },
    },
    {
      title: 'Assigned To',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Assigned By',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Assigned Date',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Start Date',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'End Date',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Campaign Status',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Campaign Status',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Comments',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Booking Plan',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Release Plan',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Executed Image',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Download Campaign',
      accessKey: '1',
      sort: false,
    },
    {
      title: 'Email',
      accessKey: '1',
      sort: false,
    },
  ];

  useEffect(() => {
    CampaignListApi.getCampaignAssignment();
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
