import React, { useMemo } from 'react';
// import Table from 'react-bootstrap/Table';
import './index.css';
import Button from 'react-bootstrap/Button';
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
import CommonTable from '../Table/CommonTable';
import FosRmTable from './FosRmTable';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function ViewCampaignTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showTable, setshowTable] = React.useState({ first: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [selectedId, setSelectedId] = React.useState('');

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
      name: 'Campaign Name',
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
      tooltip: 'Lead Accepted by Client',
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
      name: 'View End Customer',
    },
    {
      name: 'View City',
    },
    {
      name: 'Action',
    },
  ];

  const bodyData = () => {
    let data = [
      {
        sno: '1',
        name: 'Kriti Test company',
        sharedCount: '6000',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        commentUpdate: '3000',
        statusUpdate: '3000',
        revenue: '30k',
        endCustomer: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClickCustomerCity('View End Customer')}
          >
            View End Customer
          </Button>
        ),
        city: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClickCustomerCity('View City')}
          >
            View City
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
        name: 'Great Learning Proposal',
        sharedCount: '6000',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        commentUpdate: '3000',
        statusUpdate: '3000',
        revenue: '30k',
        endCustomer: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClickCustomerCity('View End Customer')}
          >
            View End Customer
          </Button>
        ),
        city: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClickCustomerCity('View City')}
          >
            View City
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
        name: 'JSW Paints survey',
        sharedCount: '6000',
        leadCount: '5000',
        leadQA: '3000',
        leadClient: '3000',
        commentUpdate: '3000',
        statusUpdate: '3000',
        revenue: '30k',
        endCustomer: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClickCustomerCity('View End Customer')}
          >
            View End Customer
          </Button>
        ),
        city: (
          <Button
            variant="outline-dark"
            className="lead-btn"
            onClick={() => onClickCustomerCity('View City')}
          >
            View City
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
                setSelectedId(selectedId === ele.sno ? '' : ele.sno);
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
            <Td>{ele.endCustomer}</Td>
            <Td>{ele.city}</Td>
            <Td>{ele.action}</Td>
          </Tr>
          {selectedId === ele.sno && <FosRmTable styles={{ colSpan: 13 }} />}
        </>
      );
    });
    return body;
  };

  async function onClickCustomerCity(btnName) {
    await setshowHideTableObj({
      ...showHideTableObj,
      ViewEndCustomerWise: true,
      ViewCampaignWise: false,
    });
    setShowHideBreadCrumbs({ ...showHideBreadCrumbs, third: { show: true, tableName: btnName } });
  }
  return (
    <>
      <CommonTable headerData={headerData} bodyData={bodyData} />
      {/* <h4 style={{ paddingTop: '10px' }}>View Campaign</h4> */}
      {/* <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th></th>
            <th>S.No.</th>
            <th>Campaign Name</th>
            <th>To be Shared</th>
            <th>Count</th>
            <th>Lead accepted by QA</th>
            <th>Lead Accepted by Client</th>
            <th>Comment updated</th>
            <th>Status updated</th>
            <th>Revenue Earned</th>
            <th>View End Customer</th>
            <th>View City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              {isExpandRow.b2b && <BsChevronUp />}
              {!isExpandRow.b2b && <BsChevronDown />}
            </td>
            <td>1</td>
            <td>Kriti Test company</td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() => onClickCustomerCity('View End Customer')}
              >
                View End Customer
              </Button>
            </td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() => onClickCustomerCity('View City')}
              >
                View City
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
          {isExpandRow.b2b && (
            <tr>
              <td colSpan={13} className="nested-leads-table-colspan ">
                <Table striped bordered hover className="nested-leads-table ">
                  <thead className="leads-tbody">
                    <tr>
                      <th>S.No.</th>
                      <th>Lead Source</th>
                      <th>Total Lead Count Shared</th>
                      <th>Lead accepted by QA</th>
                      <th>Lead Accepted by Client</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.1</td>
                      <td>FOS</td>
                      <td>5000</td>
                      <td>2500</td>
                      <td>2000</td>
                      <td>
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
                      </td>
                    </tr>
                    <tr>
                      <td>2.1</td>
                      <td>RM</td>
                      <td>5000</td>
                      <td>2500</td>
                      <td>2000</td>
                      <td>
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
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          )}

          <tr>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              <BsChevronDown />{' '}
            </td>
            <td>2</td>
            <td>Great Learning Proposal </td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View End Customer
              </Button>
            </td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View City
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              <BsChevronDown />{' '}
            </td>
            <td>3</td>
            <td>Grasim Paints survey</td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View End Customer
              </Button>
            </td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View City
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              <BsChevronDown />{' '}
            </td>
            <td>4</td>
            <td>Berger(After Package)</td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View End Customer
              </Button>
            </td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View City
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
          <tr>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              <BsChevronDown />{' '}
            </td>
            <td>5</td>
            <td>JSW Paints survey</td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View End Customer
              </Button>
            </td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() =>
                  setshowHideTableObj({
                    ...showHideTableObj,
                    ViewEndCustomerWise: true,
                    ViewCampaignWise: false,
                  })
                }
              >
                View City
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </Table> */}
    </>
  );
}
