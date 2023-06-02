import React, { useMemo } from 'react';
import Table from 'react-bootstrap/Table';
// import './index.css';
import Button from 'react-bootstrap/Button';
import {
  BsChevronDown,
  BsChevronUp,
  BsEnvelopeFill,
  BsArrowDownCircle,
  BsWhatsapp,
} from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { showHideTable } from '../Recoil/States/Machadalo';
export default function ViewLeadDetailTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showTable, setshowTable] = React.useState({ first: false, b2c: false });
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);

  return (
    <>
      <h4 style={{ paddingTop: '10px' }}>Leads Table</h4>
      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th></th>
            <th>S.No.</th>
            <th>Entity Name</th>
            <th>Entity Type</th>
            <th>Primary Count</th>
            <th>Lead Source</th>
            <th>Organization Name</th>
            <th>date of lead</th>
            <th>Status</th>
            <th>Revenue Earned</th>
            <th>View detail</th>
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
            <td>Name 1</td>
            <td>RS</td>
            <td>300</td>
            <td>FOS</td>
            <td>Machadalo</td>
            <td>12/12/2020</td>
            <td>Verified</td>
            <td>20k</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                // onClick={() => setshowHideTableObj({ ...showHideTableObj, ViewCampaignWise: true })}
              >
                View Detail
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
              <td colSpan={12} className="nested-leads-table-colspan ">
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
                      <td>2.1</td>
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
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}><BsChevronDown />  </td>
            <td>01</td>
            <td>Name 1</td>
            <td>RS</td>
            <td>300</td>
            <td>FOS</td>
            <td>Machadalo</td>
            <td>12/12/2020</td>
            <td>Verified</td>
            <td>20k</td>
            <td>
              {' '}
              <Button
                variant="outline-dark"
                className="lead-btn"
                // onClick={() => setshowHideTableObj({ ...showHideTableObj, ViewCampaignWise: true })}
              >
                View Detail
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
    </>
  );
}
