import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
export default function RelationshipModal(props) {
  const { data } = props;
  const BookingApi = BookinPlanActions();
  const [details, setDetails] = useState({});
  const recentHeader = [
    {
      title: 'Index',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return <span style={{ backgroundColor: '' }}>{index + 1}</span>;
      },
    },
    {
      title: 'Name',
      accessKey: 'name',
      sort: false,
    },
    {
      title: 'Organisation',
      accessKey: 'organisation_name',
      sort: false,
    },
  ];

  async function getDetails() {
    let getData = await BookingApi.getRelationShipData(data);
    setDetails(getData);
  }
  useEffect(() => {
    getDetails();
  }, [1]);

  return (
    <>
      <div className="rdiv">
        <ul>
          <li>
            <h4 className="relationhead">Supply Owner / Representative</h4>
          </li>
          {details && details?.supplier_data && details?.supplier_data[0] ? (
            <li className="relationdata">
              {details?.contacts?.name ? details?.contacts?.name : 'NA'}
              {details?.supplier_data[0].representative__name
                ? `(${details?.supplier_data[0].representative__name})`
                : ''}
            </li>
          ) : (
            <li className="relationdata"></li>
          )}
        </ul>
        <ul>
          <li>
            <h4 className="relationhead">Feedback About Supplier</h4>
          </li>
          {details && details?.supplier_data && details?.supplier_data[0] ? (
            <li className="relationdata">{details?.supplier_data[0].feedback}</li>
          ) : (
            <li className="relationdata">Not Given</li>
          )}
        </ul>
        <ul>
          <li>
            <h4 className="relationhead">Last Campaign Price With Name </h4>
          </li>
          <li className="relationdata">
            {' '}
            {details?.campaign_data?.last_campaign_price?.total_negotiated_price}({' '}
            {details?.campaign_data?.last_campaign_price?.proposal__name})
          </li>
        </ul>
        <ul>
          <li>
            <h4 className="relationhead">Last Campaign Price per unit </h4>
          </li>
          <li className="relationdata">-</li>
        </ul>
        <ul>
          <li>
            <h4 className="relationhead">Count Of Previous Campaigns</h4>
          </li>
          <li className="relationdata">{details?.campaign_data?.past_campaigns}</li>
        </ul>
      </div>
      <div className="camp-box">
        <div>
          <h3>Recently Held Campaigns</h3>
          {details && details?.campaign_data && details?.campaign_data?.campaigns && (
            <ReactBootstrapTable
              headerData={recentHeader}
              rowData={details?.campaign_data?.campaigns}
            />
          )}

          {/* <Table className="text-center " responsive>
            <tr>
              <th>Index</th>
              <th>Campaigns Name</th>
              <th>Organisation Name</th>
            </tr>
            {details?.campaign_data?.campaigns.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.organisation_name}</td>
                </tr>
              );
            })}
          </Table> */}
        </div>

        <div>
          <h3>Relationship Status</h3>
          <Table className="text-center " responsive>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Relationship status</th>
            </tr>
            <tr>
              <td>Index</td>
              <td>Campaigns Name</td>
              <td>Organisation Name</td>
              <td>Organisation Name</td>
            </tr>
          </Table>
        </div>
      </div>
    </>
  );
}
