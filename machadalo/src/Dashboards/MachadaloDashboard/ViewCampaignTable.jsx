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
import './index.css';
import { useRecoilState } from 'recoil';
import { showHideTable, showHideBreadcrumbsAtom, showHideModalAtom } from '../_states';
import { BreadCrumbData } from './BreadCrumb';
import EmailModal from '../common/Modals/EmailModal';
import WhatsappModal from '../common/Modals/WhatsappModal';

export default function ViewCampaignTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showTable, setshowTable] = React.useState({ first: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);

  const [showHideModal, setshowHideModal] = React.useState({
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
      {/* <h4 style={{ paddingTop: '10px' }}>View Campaign</h4> */}
      <Table striped bordered hover className="leads-table ">
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
            <td>01</td>
            <td>Campaign 1</td>
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
            <td>01</td>
            <td>Campaign 1</td>
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
            </td>
          </tr>
        </tbody>
      </Table>

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
    </>
  );
}
