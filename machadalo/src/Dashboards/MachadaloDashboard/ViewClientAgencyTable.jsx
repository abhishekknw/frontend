import React, { useMemo } from 'react';
// import Table from 'react-bootstrap/Table';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './index.css';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
} from 'react-icons/bs';
import './index.css';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideBreadcrumbsAtom, showHideModalAtom } from '../_states';
import { BreadCrumbData } from './BreadCrumb';
import EmailModal from '../common/Modals/EmailModal';
import WhatsappModal from '../common/Modals/WhatsappModal';
import FosRmTable from './FosRmTable';
import CommonTable from '../Table/CommonTable';

export default function ViewClientAgencyTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [selectedId, setSelectedId] = React.useState('');
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

  const headerData = [
    {
      name: 'S.No.',
    },
    {
      name:
        showHideBreadCrumbs.first.tableName === 'View Client Wise' ? 'Client Name' : 'Agency Name',
    },
    {
      name: 'To be Shared',
    },
    {
      name: 'Count',
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
      name: 'Comment Updated',
    },
    {
      name: 'Status Updated',
    },
    {
      name: 'Revenue Earned',
    },
    {
      name: 'View Campaign',
    },
    {
      name: 'Action',
    },
  ];

  async function onClickCampaign(btnName) {
    await setshowHideTableObj({
      ...showHideTableObj,
      ViewCampaignWise: true,
      ViewClientWise: false,
    });
    setShowHideBreadCrumbs({ ...showHideBreadCrumbs, second: { show: true, tableName: btnName } });
  }

  const bodyData = () => {
    let data = [
      {
        sno: '1',
        name: 'Asian Paints 1',
        sharedCount: '6000',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        commentUpdate: '3000',
        statusUpdate: '3000',
        revenue: '30k',
        campaignWise: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClientAgency('View Client Wise')}
          >
            View Client Wise
          </Button>
        ),
        action: (
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
        ),
      },
      {
        sno: '2',
        name: 'Client 1',
        sharedCount: '6000',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        commentUpdate: '3000',
        statusUpdate: '3000',
        revenue: '30k',
        campaignWise: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClientAgency('View Client Wise')}
          >
            View Client Wise
          </Button>
        ),
        action: (
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
        ),
      },
      {
        sno: '3',
        name: 'Asian Paints 1',
        sharedCount: '6000',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        commentUpdate: '3000',
        statusUpdate: '3000',
        revenue: '30k',
        campaignWise: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClientAgency('View Client Wise')}
          >
            View Client Wise
          </Button>
        ),
        action: (
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
        ),
      },
    ];

    let body = data.map((ele, index) => {
      return (
        <>
          <Tr className={selectedId === ele.type ? 'nested-table' : ''} key={index}>
            <Td
              className="sn-table"
              onClick={(e) => {
                setSelectedId(selectedId === ele.sno?"":ele.sno);
              }}
            >
              {selectedId === ele.sno ? <BsChevronUp /> : <BsChevronDown />}
            </Td>
            <Td>{ele.sno}</Td>
            <Td>{ele.name}</Td>
            <Td>{ele.sharedCount}</Td>
            <Td>{ele.leadCount}</Td>
            <Td>{ele.leadQA}</Td>
            <Td>{ele.leadClient}</Td>
            <Td>{ele.commentUpdate}</Td>
            <Td>{ele.statusUpdate}</Td>
            <Td>{ele.revenue}</Td>
            <Td>{ele.campaignWise}</Td>
            <Td>{ele.action}</Td>
          </Tr>
          {selectedId === ele.sno && <FosRmTable styles={{colSpan:12}}/>}
        </>
      );
    });
    return body;
  };

  return (
    <>
      {/* <h4 style={{ paddingTop: '10px' }}>Client Wise</h4> */}
      <CommonTable headerData={headerData} bodyData={bodyData} />

      {/* <Table striped bordered hover className="leads-table ">
        <Thead className="leads-tbody">
          <Tr>
            <Th></Th>
            <Th>S.No.</Th>
            <Th>
              {showHideBreadCrumbs.first.tableName === 'View Client Wise'
                ? 'Client Name'
                : 'Agency Name'}
            </Th>
            <Th>To be Shared</Th>
            <Th>Count</Th>
            <Th> Accepted by QA</Th>
            <Th> Accepted by Client</Th>
            <Th>Comment updated</Th>
            <Th>Status updated</Th>
            <Th>Revenue Earned</Th>
            <Th>View Campaign</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <Td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              {isExpandRow.b2b && <BsChevronUp />}
              {!isExpandRow.b2b && <BsChevronDown />}
            </Td>
            <Td>1</Td>
            <Td>Asian Paints 1</Td>
            <Td>5000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() => onClickCampaign('View Campaign Wise')}
              >
                View Campaign
              </Button>
            </Td>
            <Td>
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
            </Td>
          </Tr>
          {isExpandRow.b2b && (
            <Tr>
              <Td colSpan={12} className="nested-leads-table-colspan ">
                <Table striped bordered hover className="nested-leads-table ">
                  <Thead className="leads-Tbody">
                    <Tr>
                      <Th>S.No.</Th>
                      <Th>Lead Source</Th>
                      <Th>Total Lead Count Shared</Th>
                      <Th>Lead accepted by QA</Th>
                      <Th>Lead Accepted by Client</Th>
                      <Th> Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1.1</Td>
                      <Td>FOS</Td>
                      <Td>5000</Td>
                      <Td>2500</Td>
                      <Td>2000</Td>
                      <Td>
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
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>2.1</Td>
                      <Td>RM</Td>
                      <Td>5000</Td>
                      <Td>2500</Td>
                      <Td>2000</Td>
                      <Td>
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
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Td>
            </Tr>
          )}

          <Tr>
            <Td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              <BsChevronDown />{' '}
            </Td>
            <Td>2</Td>
            <Td>Clinet 1</Td>
            <Td>5000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewCampaignWise: true,
                    ViewClientWise: false,
                  })
                }
              >
                View Campaign
              </Button>
            </Td>
            <Td>
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
            </Td>
          </Tr>
          <Tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <Td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              {isExpandRow.b2b && <BsChevronUp />}
              {!isExpandRow.b2b && <BsChevronDown />}
            </Td>
            <Td>3</Td>
            <Td>Clinet 1</Td>
            <Td>5000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>3000</Td>
            <Td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() => onClickCampaign('View Campaign Wise')}
              >
                View Campaign
              </Button>
            </Td>
            <Td>
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
            </Td>
          </Tr>
        </Tbody>
      </Table> */}
    </>
  );
}
