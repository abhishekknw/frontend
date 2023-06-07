import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import CommonTable from '../../Table/CommonTable';
import { AllCampaingsAtom,showHideTableAtom } from '../../_states/Machadalo/newLeads';
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
  BsWhatsapp,BsSearch
} from 'react-icons/bs'; 
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Paginations from '../../Pagination';
import EmailModal from '../../common/Modals/EmailModal';
export default function CampaignList(props) {
  const NewLeadAction = newLeadActions();
  const CampaignList = useRecoilValue(AllCampaingsAtom);
  const [showHideTable,setshowHideTable] = useRecoilState(showHideTableAtom);
  // const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [paginationData, setPaginationData] = useState({
    pageNo: 1,
    totalcount: CampaignList.length,
    startIndex: 0,
    endIndex: 9,
  });
  const [showHideModal, setshowHideModal] = useState({
    EmailModal:false
  });

  const [clientStatus,setClientStatus] = useState([])

  useEffect(() => {
    NewLeadAction.getAllCampaigns();
  }, []);
  const headerData = [
    {
      name: 'S.No.',
    },
    {
      name: 'Campaign Name',
    },

    {
      name: 'Start Date',
    },
    {
      name: 'Supplier Count',
    },
    {
      name: 'View Leads',
    },
    {
      name: 'Action',
    },
  ];

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
  const getLeadsByCampaign = async(row)=>{
   await NewLeadAction.getLeadByCampaignId(row);
   setshowHideTable({...showHideTable,viewLeads:{show:true}})
  }

  const sendEmailModal = async(item)=>{
    let response = await NewLeadAction.getClientStatusList(item);
    setClientStatus([...response.client_status])
    setshowHideModal({EmailModal:true});
    // setshowHideModal({ ...showHideModal, email: { show: true } });
  }

  const onSendEmail = (data) =>{
    setshowHideModal({EmailModal:false});
  }
  return (
    <>
      {/* <CommonTable headerData={headerData} bodyData={bodyData} firstColumn={true}/> */}
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h4>Customer Table</h4>
        </div>
        <div className='searchbox'>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search" aria-label="Search" />
            <InputGroup.Text><BsSearch /></InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            {headerData?.map((item, index) => {
              return <th key={index}>{item.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {CampaignList.map((item, index) => {
            if (paginationData.startIndex <= index && paginationData.endIndex >= index) {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.start_date}</td>
                  <td>{item.supplier_count}</td>
                  <td>
                    <Button
                      variant="outline-dark"
                      className="lead-btn"
                      onClick={() => getLeadsByCampaign(item)}
                    >
                      View Leads
                    </Button>
                  </td>
                  <td>
                    <div className="action-icon">
                      <span
                        onClick={(e) => {sendEmailModal(item)}}
                      >
                        <BsEnvelopeFill />
                      </span>
                      <span>
                        <BsArrowDownCircle />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>

      <Paginations
        pageSize={10}
        totalItems={CampaignList.length}
        pageNo={paginationData.pageNo}
        onPageChange={handlePageChange}
      />

      <EmailModal
      data={{show:showHideModal.EmailModal,dropdownOptions:clientStatus}}
      onSubmit={onSendEmail}
      />
    </>
  );
}
