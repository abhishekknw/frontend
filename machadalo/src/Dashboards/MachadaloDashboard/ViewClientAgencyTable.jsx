import React, { useMemo } from 'react';
import Table from 'react-bootstrap/Table';
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

export default function ViewClientAgencyTable(props) {
  const [isExpandRow, setIsExpandRow] = React.useState({ b2b: false, b2c: false });
  const [showTable, setshowTable] = React.useState({ first: false, b2c: false });

  return (
    <>
      <h4 className='pt-5'>ViewTable</h4>
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

      <Table striped bordered hover className="leads-table ">
        <thead className="leads-tbody">
          <tr>
            <th></th>
            <th>S.No.</th>
            <th>Client  Name</th>
            <th>To be Shared</th>
            <th>Count</th>
            <th> accepted by QA</th>
            <th> Accepted by Client</th>
            <th>Comment updated</th>
            <th>Status updated</th>
            <th>Revenue Earned</th>
            <th>View Campaign</th>
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
            <td>Clinet 1</td>
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
                onClick={() => setshowTable({ ...showTable, first: true })}
              >
                View Campaign
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

          <tr className={isExpandRow.b2b ? 'nested-table' : ''}>
            <td onClick={() => setIsExpandRow({ ...isExpandRow, b2b: !isExpandRow.b2b })}>
              {isExpandRow.b2b && <BsChevronUp />}
              {!isExpandRow.b2b && <BsChevronDown />}
            </td>
            <td>01</td>
            <td>Clinet 1</td>
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
                onClick={() => setshowTable({ ...showTable, first: true })}
              >
                View Campaign
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
