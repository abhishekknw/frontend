import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './bookingPlan.css';
import ReactDOM from 'react-dom';

import DataTable from 'datatables.net-dt';
import { Table, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { IoClose } from 'react-icons/io5';
import 'datatables.net-responsive';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
export default function BookingPlan() {
  const BookingApi = BookinPlanActions();
  const tableRef = useRef();
  const tableName = 'bookingPlanTable';

  const [columnsList, setColumnList] = useState([]);

  useEffect(() => {
    const table = new DataTable(`#${tableName}`, {
      details: {
        renderer: $.fn.dataTable.Responsive.renderer.listHiddenNodes(),
      },
      info: false,
      paging: false,
      responsive: true,
      searching: false,
    });
    // Extra step to do extra clean-up.
    return function () {
      console.log('Table destroyed');
      table.destroy();
    };
  }, []);

  useEffect(async () => {
    await BookingApi.getCampaignInventories();
    let header = await BookingApi.getHeaderData();
    let headerKeys = Object.keys(header);
    let temp = [];
    headerKeys.map((i) => {
      temp.push({ title: header[i] });
    });
    setColumnList(temp);
    console.log(temp);
  }, []);
  return (
    <>
      <div className="booking-plan-wrapper">
        <h2>Booking Plan</h2>
        <div className="status-bar">
          <div className="status-bar-item">
            <span className="status-lable">Campaign Id:</span>
            <span className="status-lable">AAKAAK002A</span>
          </div>
          <div className="status-bar-item">
            <span className="status-lable">Campaign Name:</span>
            <span className="status-lable">Aakash Ghodbunder</span>
          </div>
          <div className="status-bar-item">
            <span className="status-lable">BD Owner:</span>
            <span className="status-lable">vidhidevelopment</span>
          </div>
          <div className="status-bar-item">
            <span className="status-lable">Campaign State:</span>
            <span className="status-lable">Converted</span>
          </div>
        </div>

        <div className="booking-plan-table">
          <table className="display" width="100%" id={tableName} ref={tableRef}>
            <thead>
              <tr>
                <th>sNo</th>
                {columnsList &&
                  columnsList.length > 0 &&
                  columnsList.map((item, index) => {
                    return <th key={index}>{item.title}</th>;
                  })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {columnsList.map((item, index) => {
                  return <td key={index}>{item.title}+11</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="booking-filter">
          <h5>Booking Filter</h5>
          <div className="filter-close">
            <IoClose />
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Select
                className=""
                options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                label="Supplier Type"
                id="SupplierType"
                placeholder="Supplier Type"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Booking Status</Form.Label>
              <Select
                className=""
                options={[
                  { label: 'Booking Status 1' },
                  { label: 'Booking Status 2' },
                  { label: 'Booking Status 3' },
                ]}
                label="Booking Status"
                id="BookingStatus"
                placeholder="Booking Status"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Phases</Form.Label>
              <Select
                className=""
                options={[{ label: '1' }, { label: '2' }, { label: '3' }]}
                label="Phases"
                id="Phases"
                placeholder="Phases"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>User</Form.Label>
              <Select
                className=""
                options={[{ label: '1' }, { label: '2' }, { label: '3' }]}
                label="User"
                id="User"
                placeholder="User"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Next Action Date</Form.Label>
              <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>
            <div className="filter-action-wrapper">
              <Button variant="secondary" type="submit">
                Back
              </Button>

              <Button variant="info" type="submit">
                Clear
              </Button>
              <Button variant="primary" type="submit">
                Apply
              </Button>
            </div>
          </Form>
        </div> */}
      </div>
    </>
  );
}
