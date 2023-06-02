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
import { useRecoilState, useRecoilValue } from 'recoil';
import { showHideTable, breadcrumbAtom, showHideBreadcrumbsAtom } from '../Recoil/States/Machadalo';
import ViewEndCustomerCityTable from './ViewEndCustomerCityTable';
import ViewLeadDetailTable from './LeadDetailTable';
import CommonTable from '../Table/CommonTable';
import FosRmTable from './FosRmTable';
import { BreadCrumbData } from './BreadCrumb';
export default function LeadsTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const BreadCrumbs = useRecoilValue(breadcrumbAtom);

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

  // const NestedHeaderData = [
  //   {
  //     name: 'S.No.',
  //   },
  //   {
  //     name: 'Lead Source',
  //   },
  //   {
  //     name: 'Total Lead Count Shared',
  //   },
  //   {
  //     name: 'Lead Accepted By QA',
  //   },
  //   {
  //     name: 'Lead Accepted By Client',
  //   },
  //   {
  //     name: 'Action',
  //   },
  // ];

  // const FosRmBodyData = () => {
  //   let data = [
  //     {
  //       sno: '1.1',
  //       type: 'FOS',
  //       leadCount: '5000',
  //       leadQA: '3000',
  //       leadClient: '3000',
  //       action: (
  //         <div>
  //           <div className="action-icon">
  //             <span>
  //               <BsEnvelopeFill />
  //             </span>
  //             <span>
  //               <BsArrowDownCircle />
  //             </span>
  //             <span>
  //               <BsWhatsapp />
  //             </span>
  //           </div>
  //         </div>
  //       ),
  //     },
  //     {
  //       sno: '1.2',
  //       type: 'RM',
  //       leadCount: '5000',
  //       leadQA: '3000',
  //       leadClient: '3000',
  //       action: (
  //         <div>
  //           <div className="action-icon">
  //             <span>
  //               <BsEnvelopeFill />
  //             </span>
  //             <span>
  //               <BsArrowDownCircle />
  //             </span>
  //             <span>
  //               <BsWhatsapp />
  //             </span>
  //           </div>
  //         </div>
  //       ),
  //     },
  //   ];

  //   let body = data.map((ele, key) => {
  //     return (<>
  //       <tr>
  //         <td></td>
  //         <td>{ele.sno}</td>
  //         <td>{ele.type}</td>
  //         <td>{ele.leadCount}</td>
  //         <td>{ele.leadQA}</td>
  //         <td>{ele.leadClient}</td>
  //         <td>{ele.action}</td>
  //       </tr>
  //     </>
  //     )
  //   })

  //   return body;
  // }
  async function onClientAgency(btnName) {
    await setshowHideTableObj({ ...showHideTableObj, ViewClientWise: true });
    setShowHideBreadCrumbs({ ...showHideBreadCrumbs, first: { show: true ,tableName:btnName} });
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
          {isExpandRow.b2b && <FosRmTable />}
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
      {(showHideTableObj.ViewClientWise ||
        showHideTableObj.ViewCampaignWise ||
        showHideTableObj.ViewEndCustomerWise ||
        showHideTableObj.ViewLeadDetail) && (
        <nav>
          <ol class="breadcrumb">
            {/* {BreadCrumbs.map((item,index) => {
           return (
           <li key={index}>
              <a>
                <span>{item}</span>
              </a>
            </li>
            )
          })} */}
            {showHideBreadCrumbs.first.show && (
              <li>
                <a>
                  <span>{showHideBreadCrumbs.first.tableName}</span>
                </a>
              </li>
            )}
            {showHideBreadCrumbs.second.show && (
              <li>
                <a>
                  <span>{showHideBreadCrumbs.second.tableName}</span>
                </a>
              </li>
            )}
            {showHideBreadCrumbs.third.show && (
              <li>
                <a>
                  <span>{showHideBreadCrumbs.third.tableName}</span>
                </a>
              </li>
            )}
            {showHideBreadCrumbs.fourth.show && (
              <li>
                <a>
                  <span>{showHideBreadCrumbs.fourth.tableName}</span>
                </a>
              </li>
            )}
          </ol>
        </nav>
      )}
      {/* Breadcrumb */}

      {showHideTableObj.ViewClientWise && <ViewClientAgencyTable />}
      {showHideTableObj.ViewCampaignWise && <ViewCampaignTable />}
      {showHideTableObj.ViewEndCustomerWise && <ViewEndCustomerCityTable />}
      {showHideTableObj.ViewLeadDetail && <ViewLeadDetailTable />}
    </>
  );
}
