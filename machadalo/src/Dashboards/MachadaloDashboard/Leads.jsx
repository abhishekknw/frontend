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
import ViewEndCustomerCityTable from '../common/Tables/ViewEndCustomerCityTable';
import ViewLeadDetailTable from '../common/Tables/LeadDetailTable';
export default function LeadsTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);

  return (
    <>
      <h4 >Leads</h4>
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th></th>
            <th>S.No.</th>
            <th>Lead type</th>
            <th>Lead Count</th>
            <th>Lead accepted by QA</th>
            <th>Lead Accepted by Client</th>
            <th>View Client Wise</th>
            <th>View Agency Wise</th>
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
            <td>B2B</td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                onClick={() => setshowHideTableObj({ ...showHideTableObj, ViewClientWise: true })}
              >
                View Client Wise
              </Button>
            </td>
            <td>
              {' '}
              <Button variant="outline-dark" className="lead-btn">
                View Agency Wise
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
          {isExpandRow.b2b && (
            <tr>
              <td colSpan={9} className="nested-leads-table-colspan ">
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
                      </td>
                    </tr>
                    <tr>
                      <td>1.2</td>
                      <td>RM</td>
                      <td>5000</td>
                      <td>2500</td>
                      <td>2000</td>
                      <td>
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
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <BsChevronDown />
            </td>
            <td>02</td>
            <td>B2C</td>
            <td>5000</td>
            <td>3000</td>
            <td>3000</td>
            <td>
              {' '}
              <Button variant="outline-dark" className="lead-btn">
                View Client Wise
              </Button>
            </td>
            <td>
              {' '}
              <Button variant="outline-dark" className="lead-btn">
                View Agency Wise
              </Button>
            </td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </Table>

      {showHideTableObj.ViewClientWise && <ViewClientAgencyTable />}
      {showHideTableObj.ViewCampaignWise && <ViewCampaignTable />}
      {showHideTableObj.ViewEndCustomerWise && <ViewEndCustomerCityTable />}
      {showHideTableObj.ViewLeadDetail && <ViewLeadDetailTable />}
    </>
  );
}
