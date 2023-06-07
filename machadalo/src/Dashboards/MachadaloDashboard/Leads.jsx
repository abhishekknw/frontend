import React, { useMemo, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './index.css';
import Button from 'react-bootstrap/Button';
import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
} from 'react-icons/bs';
import ViewClientAgencyTable from './ViewClientAgencyTable';
import ViewCampaignTable from './ViewCampaignTable';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideBreadcrumbsAtom, showHideModalAtom } from '../_states';
import ViewEndCustomerCityTable from './ViewEndCustomerCityTable';
import ViewLeadDetailTable from './LeadDetailTable';
import CommonTable from '../Table/CommonTable';
import FosRmTable from './FosRmTable';
import { BreadCrumbData } from './BreadCrumb';
import EmailModal from '../common/Modals/EmailModal';
import WhatsappModal from '../common/Modals/WhatsappModal';
export default function LeadsTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const [showHideModal, setshowHideModal] = useState({
    EmailModal: false,
    WhatsAppModal: false,
  });
  const onSendEmail = async (data, check) => {
    setshowHideModal({ EmailModal: false });
  };
  const openEmailModal = async (item) => {
    setshowHideModal({ ...showHideModal, EmailModal: true });
    // setshowHideModal({ ...showHideModal, email: { show: true } });
  };

  const OnshareWhatsApp = () => {
    setshowHideModal({ ...showHideModal, WhatsAppModal: false });
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
      name: 'View Client Wise',
    },
    {
      name: 'View Agency Wise',
    },
    {
      name: 'Action',
    },
  ];

  function onClientAgency(btnName) {
    setshowHideTableObj({
      ...showHideTableObj,
      ViewClientWise: true,
      ViewEndCustomerWise: false,
      ViewLeadDetail: false,
      ViewCampaignWise: false,
    });
    setShowHideBreadCrumbs({
      ...showHideBreadCrumbs,
      first: { show: true, tableName: btnName },
      second: { show: false, tableName: btnName },
      third: { show: false, tableName: btnName },
      fourth: { show: false, tableName: btnName },
    });
  }
  const bodyData = () => {
    let data = [
      {
        sno: '01',
        type: 'B2B',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        clientWise: (
          <div>
            <Button
              variant="outline-dark"
              className="lead-btn"
              onClick={() => onClientAgency('View Client Wise')}
            >
              View Client Wise
            </Button>
          </div>
        ),
        agencyWise: (
          <div>
            <Button
              variant="outline-dark"
              className="lead-btn"
              onClick={() => onClientAgency('View Agency Wise')}
            >
              View Agency Wise
            </Button>
          </div>
        ),
        action: (
          <div>
            <div className="action-icon">
              <span
                onClick={(e) => {
                  openEmailModal();
                }}
              >
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span
                onClick={(e) => {
                  openWhatsAppModal();
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
        clientWise: (
          <div>
            <Button
              variant="outline-dark"
              className="lead-btn"
              onClick={() => onClientAgency('View Client Wise')}
            >
              View Client Wise
            </Button>
          </div>
        ),
        agencyWise: (
          <div>
            <Button
              variant="outline-dark"
              className="lead-btn"
              onClick={() => onClientAgency('View Client Wise')}
            >
              View Agency Wise
            </Button>
          </div>
        ),
        action: (
          <div>
            <div className="action-icon">
              <span
                onClick={(e) => {
                  openEmailModal();
                }}
              >
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span
                onClick={(e) => {
                  openWhatsAppModal();
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
          <tr className={isExpandRow.b2b ? 'nested-table' : ''} key={index}>
            <td
              className="sn-table"
              onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}
            >
              {isExpandRow.b2b && <BsChevronUp />}
              {!isExpandRow.b2b && <BsChevronDown />}
            </td>
            <td>{ele.sno}</td>
            <td>{ele.type}</td>
            <td>{ele.leadCount}</td>
            <td>{ele.leadQA}</td>
            <td>{ele.leadClient}</td>
            <td>{ele.clientWise}</td>
            <td>{ele.agencyWise}</td>
            <td>{ele.action}</td>
          </tr>
          {ele.type == 'B2B' && isExpandRow.b2b && <FosRmTable />}
          {/* {ele.type=='B2C' && isExpandRow.b2b && <FosRmTable />} */}
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
          show: showHideModal.EmailModal,
          dropdownOptions: [
            { status_name: 'Lead verified by Machadalo' },
            { status_name: 'Lead verified by Machadalo' },
          ],
        }}
        onSubmit={onSendEmail}
        onCancel={(e) => setshowHideModal({ ...showHideModal, EmailModal: false })}
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

      {showHideTableObj.ViewClientWise && <ViewClientAgencyTable />}
      {showHideTableObj.ViewCampaignWise && <ViewCampaignTable />}
      {showHideTableObj.ViewEndCustomerWise && <ViewEndCustomerCityTable />}
      {showHideTableObj.ViewLeadDetail && <ViewLeadDetailTable />}
    </>
  );
}
