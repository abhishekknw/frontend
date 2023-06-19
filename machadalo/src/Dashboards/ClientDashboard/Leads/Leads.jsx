import React, { useMemo, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../index.css';
import Button from 'react-bootstrap/Button';
import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
} from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideBreadcrumbsAtom, showHideModalAtom } from '../../_states';
import ViewEndCustomerCityTable from '../../MachadaloDashboard/ViewEndCustomerCityTable';
import ViewLeadDetailTable from '../../MachadaloDashboard/LeadDetailTable';
import ViewCampaignTable from '../../MachadaloDashboard/ViewCampaignTable';
import CommonTable from '../../Table/CommonTable';
import FosRmTable from '../../MachadaloDashboard/FosRmTable';
import { BreadCrumbData } from '../../MachadaloDashboard/BreadCrumb';
import EmailModal from '../../common/Modals/EmailModal';
import WhatsappModal from '../../common/Modals/WhatsappModal';
export default function LeadsTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [selectedId, setSelectedId] = React.useState('');
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

  const onSendEmail = async (data, check) => {
    setshowHideModal({ EmailModal: false });
  };
  const openEmailModal = async (item) => {
    setshowHideModal({ ...showHideModal, EmailModal: true });
    // setshowHideModal({ ...showHideModal, email: { show: true } });
  };

  const OnshareWhatsApp = () => {
    // setshowHideModal({ ...showHideModal, WhatsAppModal: false });
  };
  const openWhatsAppModal = () => {
    setshowHideModal({ ...showHideModal, WhatsAppModal: true });
  };

  const headerData = [
    {
      name: 'S.No.',
    },
    {
      name: 'Lead type',
    },
    {
      name: 'Lead Count',
    },
    {
      name: 'Lead accepted by QA',
      tooltip: 'Lead accepted by QA',
    },
    {
      name: 'Lead Accepted by Client',
      tooltip: 'Lead accepted by Client',
    },
    {
      name: 'View Campaigns',
    },
    {
      name: 'Action',
    },
  ];
  
  function onClickCampaign(btnName) {
    setshowHideTableObj({
      ...showHideTableObj,
      ViewCampaignWise: true,
      ViewClientWise: false,
      ViewEndCustomerWise: false,
      ViewLeadDetail: false,
    });
    setShowHideBreadCrumbs({
      ...showHideBreadCrumbs,
      first: { show: false, tableName: btnName },
      second: { show: true, tableName: btnName },
      third: { show: false, tableName: btnName },
      fourth: { show: false, tableName: btnName },
    });
  }

  function showHideRow(id) {
    if (id === selectedId) {
      setSelectedId('');
    } else {
      setSelectedId(id);
    }
  }
  const bodyData = () => {
    let data = [
      {
        sno: '01',
        type: 'B2B',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        campaigns: (
          <div>
            <Button
              variant="outline-dark"
              className="lead-btn"
              onClick={() => onClickCampaign('View Campaign Wise')}
            >
              View Campaigns
            </Button>
          </div>
        ),
        action: (
          <div>
            <div className="action-icon">
              <span
                onClick={(e) => {
                  setshowHideModal({ ...showHideModal, email: { show: true } });
                }}
              >
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span
                onClick={(e) => {
                  setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                }}
              >
                <BsWhatsapp />
              </span>
            </div>
          </div>
        ),
      },
      {
        sno: '02',
        type: 'B2C',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        campaigns: (
          <div>
            <Button
              variant="outline-dark"
              className="lead-btn"
              onClick={() => onClickCampaign('View Campaign Wise')}
            >
              View Campaigns
            </Button>
          </div>
        ),
        action: (
          <div>
            <div className="action-icon">
              <span
                onClick={(e) => {
                  setshowHideModal({ ...showHideModal, email: { show: true } });
                }}
              >
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span
                onClick={(e) => {
                  setshowHideModal({ ...showHideModal, whatsapp: { show: true } });
                }}
              >
                <BsWhatsapp />
              </span>
            </div>
          </div>
        ),
      },
    ];

    let body = data.map((ele, index) => {
      return (
        <>
          <tr className={selectedId === ele.type ? 'nested-table' : ''} key={index}>
            <td
              className="sn-table"
              onClick={(e) => {
                showHideRow(ele.type);
              }}
            >
              {selectedId === ele.type ? <BsChevronUp /> : <BsChevronDown />}
            </td>
            <td>{ele.sno}</td>
            <td>{ele.type}</td>
            <td>{ele.leadCount}</td>
            <td>{ele.leadQA}</td>
            <td>{ele.leadClient}</td>
            <td>{ele.campaigns}</td>
            <td>{ele.action}</td>
          </tr>
          {selectedId === ele.type && <FosRmTable />}
        </>
      );
    });
    return body;
  };

  return (
    <>
      <h4 className="h4-heading">Leads</h4>
      <EmailModal
        data={{
          dropdownOptions: [
            { status_name: 'Lead verified by Machadalo' },
            { status_name: 'Lead verified by Machadalo' },
          ],
        }}
      />
      <WhatsappModal
        data={{
          show: showHideModal.WhatsAppModal,
        }}
        onSubmit={OnshareWhatsApp}
        onCancel={(e) => setshowHideModal({ ...showHideModal, WhatsAppModal: false })}
      />
      <CommonTable headerData={headerData} bodyData={bodyData} />

      {/* Breadcrumb */}
      {(showHideTableObj.ViewClientWise ||
        showHideTableObj.ViewCampaignWise ||
        showHideTableObj.ViewEndCustomerWise ||
        showHideTableObj.ViewLeadDetail) && <BreadCrumbData />}
      {/* Breadcrumb */}

      {/* {showHideTableObj.ViewClientWise && <ViewClientAgencyTable />} */}
      {showHideTableObj.ViewCampaignWise && <ViewCampaignTable />}
      {showHideTableObj.ViewEndCustomerWise && <ViewEndCustomerCityTable />}
      {showHideTableObj.ViewLeadDetail && <ViewLeadDetailTable />}
    </>
  );
}
