import React, { useMemo } from 'react';
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
import { showHideTable } from '../Recoil/States/Machadalo';
import ViewEndCustomerCityTable from './ViewEndCustomerCityTable';
import ViewLeadDetailTable from './LeadDetailTable';
import CommonTable from '../Table/CommonTable';
import FosRmTable from './FosRmTable';
export default function LeadsTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);

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
      tooltip: "Lead accepted by QA",
    },
    {
      name: 'Lead Accepted by Client',
      tooltip: "Lead accepted by Client",
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

  const NestedHeaderData = [
    {
      name: 'S.No.',
    },
    {
      name: 'Lead Source',
    },
    {
      name: 'Total Lead Count Shared',
    },
    {
      name: 'Lead Accepted By QA',
    },
    {
      name: 'Lead Accepted By Client',
    },
    {
      name: 'Action',
    },
  ];

  const FosRmBodyData = () => {
    let data = [
      {
        sno: '1.1',
        type: 'FOS',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        action: (
          <div>
            <div className="action-icon">
              <span>
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span>
                <BsWhatsapp />
              </span>
            </div>
          </div>
        ),
      },
      {
        sno: '1.2',
        type: 'RM',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        action: (
          <div>
            <div className="action-icon">
              <span>
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span>
                <BsWhatsapp />
              </span>
            </div>
          </div>
        ),
      },
    ];

    let body = data.map((ele, key) => {
      return (<>
        <tr>
          <td></td>
          <td>{ele.sno}</td>
          <td>{ele.type}</td>
          <td>{ele.leadCount}</td>
          <td>{ele.leadQA}</td>
          <td>{ele.leadClient}</td>
          <td>{ele.action}</td>
        </tr>
      </>
      )
    })

    return body;
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
              onClick={() => setshowHideTableObj({ ...showHideTableObj, ViewClientWise: true })}
            >
              View Client Wise
            </Button>
          </div>
        ),
        agencyWise: (
          <div>
            <Button variant="outline-dark" className="lead-btn">
              View Agency Wise
            </Button>
          </div>
        ),
        action: (
          <div>
            <div className="action-icon">
              <span>
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span>
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
              onClick={() => setshowHideTableObj({ ...showHideTableObj, ViewClientWise: true })}
            >
              View Client Wise
            </Button>
          </div>
        ),
        agencyWise: (
          <div>
            <Button variant="outline-dark" className="lead-btn">
              View Agency Wise
            </Button>
          </div>
        ),
        action: (
          <div>
            <div className="action-icon">
              <span>
                <BsEnvelopeFill />
              </span>
              <span>
                <BsArrowDownCircle />
              </span>
              <span>
                <BsWhatsapp />
              </span>
            </div>
          </div>
        ),
      },
    ];

    let body = data.map((ele, key) => {
      return (
        <>
          <tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
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
          {isExpandRow.b2b && (
            <FosRmTable />
          )}
        </>
      );
    });
    return body;
  };

  return (
    <>
      <h4>Leads</h4>

      <CommonTable headerData={headerData} bodyData={bodyData} />

      {/* Breadcrumb */}
      <nav>
        <ol class="breadcrumb " itemscope itemtype="http://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="#">
              <span itemprop="name">View Client</span>
            </a>
            <meta itemprop="position" content="1" />
          </li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="#">
              <span itemprop="name">View Campaign</span>
            </a>
            <meta itemprop="position" content="2" />
          </li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="#">
              <span itemprop="name">View City</span>
            </a>
            <meta itemprop="position" content="3" />
          </li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="#">
              <span itemprop="name">View Leads</span>
            </a>
            <meta itemprop="position" content="4" />
          </li>
        </ol>
      </nav>
      {/* Breadcrumb */}

      {showHideTableObj.ViewClientWise && <ViewClientAgencyTable />}
      {showHideTableObj.ViewCampaignWise && <ViewCampaignTable />}
      {showHideTableObj.ViewEndCustomerWise && <ViewEndCustomerCityTable />}
      {showHideTableObj.ViewLeadDetail && <ViewLeadDetailTable />}
    </>
  );
}
