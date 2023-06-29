import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import CommonTable from '../../Table/CommonTable';
import {
  AllCampaingsAtom,
  showHideTableAtom,
  NewLeadTabFilterAtom,
} from '../../_states/Machadalo/newLeads';
import { showHideModalAtom } from '../../_states';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';

import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
  BsSearch,
  BsSortDown,
  BsSortUp,
} from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Paginations from '../../Pagination';
import EmailModal from '../../common/Modals/EmailModal';
import NewViewLeadsTable from './NewViewLeadsTable';
import DownloadModal from '../../common/Modals/DownloadModal';

export default function CampaignList(props) {
  const NewLeadAction = newLeadActions();
  const [CampaignList, setCampaignList] = useRecoilState(AllCampaingsAtom);
  const [showHideTable, setshowHideTable] = useRecoilState(showHideTableAtom);
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [filters, setFilters] = useRecoilState(NewLeadTabFilterAtom);
  const [paginationData, setPaginationData] = useState({
    pageNo: 1,
    totalcount: CampaignList.length,
    startIndex: 0,
    endIndex: 9,
  });
  // const [showHideModal, setshowHideModal] = useState({
  //   EmailModal: false,
  // });
  const [campaignData, setCampaignData] = useState({});

  const [headerData, setheaderData] = useState([
    {
      name: 'S.No.',
      key: 'index',
    },
    {
      name: 'Campaign Name',
      key: 'campaign_name',
    },

    {
      name: 'Start Date',
      key: 'start_date',
      sortIcon: { show: true, direction: <BsSortDown /> },
    },
    {
      name: 'Supplier Count',
      key: 'supplier_count',
      sortIcon: { show: true, direction: <BsSortDown /> },
    },
    {
      name: 'View Leads',
      key: 'View Leads',
    },
    {
      name: 'Action',
      key: 'Action',
    },
  ]);
  const dropdownOption = [
    { name: 'All', value: 'All' },
    { name: 'Leads', value: 'Leads' },
    { name: 'Survey', value: 'Survey' },
    { name: 'Feedback', value: 'Feedback' },
    { name: 'Survey Leads', value: 'Survey Leads' },
  ];
  const supplierTypeCode = [
    { name: 'ALL', value: 'all' },
    { name: 'Residential Society', value: 'RS' },
    { name: 'Corporate Park', value: 'CP' },
    { name: 'Bus Shelter', value: 'BS' },
    { name: 'Gym', value: 'GY' },
    { name: 'Saloon', value: 'SA' },
    { name: 'Retail Store', value: 'RE' },
    { name: 'Bus', value: 'BU' },
    { name: 'Corporates', value: 'CO' },
    { name: 'Educational Institute', value: 'EI' },
    { name: 'Gantry', value: 'GN' },
    { name: 'Hospital', value: 'HL' },
    { name: 'Hording', value: 'HO' },
    { name: 'In-shop Retail', value: 'IR' },
    { name: 'Radio Channel', value: 'RC' },
    { name: 'TV Channel', value: 'TV' },
    { name: 'Mix', value: 'mix' },
  ];

  useEffect(() => {
    NewLeadAction.getAllCampaigns(filters);
  }, []);

  const handlePageChange = async (event, value) => {
    if (value === 1) {
      setPaginationData({
        pageNo: 1,
        totalcount: CampaignList.length,
        startIndex: 0,
        endIndex: 9,
      });
    } else {
      setPaginationData({
        ...paginationData,
        startIndex: paginationData.endIndex + 1,
        endIndex: value * 10 - 1,
        pageNo: value,
      });
    }
  };
  const getLeadsByCampaign = async (row) => {
    let temp = { ...filters, campaign_id: row.campaign_id, next_page: 0 };
    await NewLeadAction.getLeadByCampaignId(temp);
    await NewLeadAction.getClientStatusList(row);
    setFilters({ ...filters, campaign_id: row.campaign_id });
    setshowHideTable({ ...showHideTable, viewLeads: { show: true } });
    setCampaignData(row);
  };

  const openEmailModal = async (item) => {
    let response = await NewLeadAction.getClientStatusList(item);
    setClientStatus([...response.client_status]);
    setshowHideModal({ EmailModal: true });
    setCampaignData(item);
    // setshowHideModal({ ...showHideModal, email: { show: true } });
  };

  const handleSelect = (data) => {
    let temp = { ...filters, lead_type: data.value };
    setFilters({ ...filters, lead_type: data.value });
    NewLeadAction.getAllCampaigns(temp);
  };

  const handleSupplier = (data) => {
    let temp = { ...filters, supplier_type: data.value };
    setFilters({ ...filters, supplier_type: data.value });
    NewLeadAction.getAllCampaigns(temp);
  };

  const onSearch = (e) => {
    let data = { ...filters, search: e.target.value };
    setFilters({ ...filters, search: e.target.value });
    if (e.target.value != '' && e.target.value.length > 2) {
      NewLeadAction.getAllCampaigns(data);
    }
  };

  const sortTableBy = (header) => {
    if (header.key === 'supplier_count') {
      let sortedData = [...CampaignList].sort((a, b) =>
        header?.sortIcon?.show
          ? a.supplier_count - b.supplier_count
          : b.supplier_count - a.supplier_count
      );
      setCampaignList(sortedData);
    } else if (header.key === 'start_date') {
      let sortedData = [...CampaignList].sort((a, b) => {
        return (header?.sortIcon?.show)
          ? new Date(b.start_date) - new Date(a.start_date)
          : new Date(a.start_date) - new Date(b.start_date);
      });
      setCampaignList(sortedData);
    }
    if (header?.sortIcon?.show != undefined) {
      let newHeader = headerData.map((item, index) => {
        if (item.key === header.key) {
          return {
            ...item,
            sortIcon: {
              show: !header?.sortIcon?.show,
              direction: header?.sortIcon?.show ? <BsSortUp /> : <BsSortDown />,
            },
          };
        } else {
          return item;
        }
      });
      setheaderData(newHeader);
    }
  };
  return (
    <>
      {/* <CommonTable headerData={headerData} bodyData={bodyData} firstColumn={true}/> */}
      <div className="text-center">
        <h4 className="table-head">{'Campaigns'.toUpperCase()}</h4>
      </div>
      <div className=" mobile-block d-flex justify-content-between align-items-center pt-2 pb-3">
        <div className="campaign-list-dropdown">
          <Dropdown className="me-4">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {filters.lead_type}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {dropdownOption.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    eventKey={item.value}
                    onClick={(e) => {
                      handleSelect(item);
                    }}
                    active={filters.lead_type === item.value}
                  >
                    {item.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-second">
              {supplierTypeCode.find((item) => item.value === filters.supplier_type).name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {supplierTypeCode.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    eventKey={item.value}
                    onClick={(e) => {
                      handleSupplier(item);
                    }}
                    active={filters.supplier_type === item.value}
                  >
                    {item.name}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Item>All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="searchbox">
          <InputGroup className="">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              value={filters.search}
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
      <Table striped bordered hover className="leads-table  mobile-t-padding">
        <Thead className="leads-tbody">
          <Tr>
            {headerData?.map((item, index) => {
              return (
                <Th
                  key={index}
                  onClick={(e) => {
                    sortTableBy(item);
                  }}
                >
                  {item.name} <span>{item?.sortIcon?.direction}</span>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {CampaignList.map((item, index) => {
            if (paginationData.startIndex <= index && paginationData.endIndex >= index) {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{dayjs(item.start_date).format('DD-MMM-YYYY')}</Td>
                  <Td>
                    {item.supplier_count}({item.unique_count})
                  </Td>
                  <Td>
                    <Button
                      variant="outline-dark"
                      className="lead-btn"
                      onClick={() => getLeadsByCampaign(item)}
                    >
                      View Leads
                    </Button>
                  </Td>
                  <Td>
                    <div className="action-icon">
                      <span
                        onClick={(e) => {
                          setshowHideModal({
                            ...showHideModal,
                            email: { show: true, tableName: 'Campaign', data: item },
                          });
                          NewLeadAction.getClientStatusList(item);
                        }}
                      >
                        <BsEnvelopeFill />
                      </span>
                      <span
                        onClick={(e) => {
                          setshowHideModal({
                            ...showHideModal,
                            download: { show: true, tableName: 'Campaign', data: item },
                          });
                        }}
                        // onClick={(e)=>{NewLeadAction.downloadLeadsSummary(item.campaign_id)}}
                      >
                        <BsArrowDownCircle />
                      </span>
                    </div>
                  </Td>
                </Tr>
              );
            }
          })}
        </Tbody>
      </Table>

      <Paginations
        pageSize={10}
        totalItems={CampaignList.length}
        pageNo={paginationData.pageNo}
        onPageChange={handlePageChange}
      />
      <DownloadModal />

      {showHideTable.viewLeads.show && <NewViewLeadsTable Data={campaignData} />}
    </>
  );
}
