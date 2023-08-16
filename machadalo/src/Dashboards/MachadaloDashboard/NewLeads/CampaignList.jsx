import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {
  AllCampaingsAtom,
  showHideTableAtom,
  NewLeadTabFilterAtom,
} from '../../_states/Machadalo/newLeads';
import { showHideModalAtom } from '../../_states';
import { useRecoilState } from 'recoil';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';

import { BsEnvelopeFill, BsArrowDownCircle, BsSearch, BsSortDown, BsSortUp } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import NewViewLeadsTable from './NewViewLeadsTable';
import DownloadModal from '../../common/Modals/DownloadModal';
import ReactPagination from '../../Pagination/Pagination';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import SearchBox from '../../common/search/SearchBox';
import TableHeader from '../../Table/TableHeader/TableHeader';

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
    { label: 'All', value: 'All' },
    { label: 'Leads', value: 'Leads' },
    { label: 'Survey', value: 'Survey' },
    { label: 'Feedback', value: 'Feedback' },
    { label: 'Survey Leads', value: 'Survey Leads' },
  ];
  const supplierTypeCode = [
    { label: 'ALL', value: 'all' },
    { label: 'Residential Society', value: 'RS' },
    { label: 'Corporate Park', value: 'CP' },
    { label: 'Bus Shelter', value: 'BS' },
    { label: 'Gym', value: 'GY' },
    { label: 'Saloon', value: 'SA' },
    { label: 'Retail Store', value: 'RE' },
    { label: 'Bus', value: 'BU' },
    { label: 'Corporates', value: 'CO' },
    { label: 'Educational Institute', value: 'EI' },
    { label: 'Gantry', value: 'GN' },
    { label: 'Hospital', value: 'HL' },
    { label: 'Hording', value: 'HO' },
    { label: 'In-shop Retail', value: 'IR' },
    { label: 'Radio Channel', value: 'RC' },
    { label: 'TV Channel', value: 'TV' },
    { label: 'Mix', value: 'mix' },
  ];

  useEffect(() => {
    NewLeadAction.getAllCampaigns(filters);
  }, []);

  const handlePageChange = async (event) => {
    let value = event.selected + 1;
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
    let data = { ...filters, search: e };
    setFilters({ ...filters, search: e });
    if (e != '' && e.length > 2) {
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
        return header?.sortIcon?.show
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
      <TableHeader headerValue="Campaigns" />
      <div className=" mobile-block d-flex justify-content-between align-items-center pt-2 pb-3">
        <div className="campaign-list-dropdown">
          {/* <Dropdown className="me-4">
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
          </Dropdown> */}
          <div className="me-4">
            <SelectDropdown
              className="testing"
              optionsData={dropdownOption}
              selectedValue={filters.lead_type}
              placeholder="Lead Type"
              label="Lead Type"
              id="LeadType"
              handleSelect={handleSelect}
            />
          </div>
          <div className="me-4">
            <SelectDropdown
              optionsData={supplierTypeCode}
              selectedValue={
                supplierTypeCode.find((item) => item.value === filters.supplier_type).value
              }
              placeholder="Supplier Type"
              label="Supplier Type"
              id="supplier_type"
              handleSelect={handleSupplier}
            />
          </div>

          {/* <Dropdown>
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
          </Dropdown> */}
        </div>
        <SearchBox onSearch={onSearch} />

        {/* <div className="searchbox">
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
        </div> */}
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
      <ReactPagination
        pageNo={paginationData.pageNo}
        pageSize={10}
        totalItems={CampaignList.length}
        onPageChange={handlePageChange}
      />
      <DownloadModal />

      {showHideTable.viewLeads.show && <NewViewLeadsTable Data={campaignData} />}
    </>
  );
}
