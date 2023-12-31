import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-responsive';
// import 'datatables.net-plugins/sorting/anti-the.mjs';
import DataTable from 'datatables.net-dt';
import Select from 'react-select';
import { Modal, Button, Col } from 'react-bootstrap';

import {
  BsSortDown,
  BsChevronDoubleRight,
  BsFillChatDotsFill,
  BsPencilSquare,
  BsFillXCircleFill,
  BsCheckLg,
} from 'react-icons/bs';
import './opsdashboard.css';
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import RequirementEditModal from './RequirementEditModal';
import ReactDOM from 'react-dom';

const columnsList = [
  { title: 'Current Partner' },
  { title: 'Feedback' },
  { title: 'Preferred Partner' },
  { title: 'L4 Answers' },
  { title: 'L5 Answers' },
  { title: 'L6 Answers' },
  { title: 'Lead Status' },
  { title: 'Comment' },
  { title: 'Internal Comment' },
  { title: 'Lead Given by' },
  { title: 'Supplier Agency' },
  { title: 'Agency User	' },
  { title: 'Call Status' },
  { title: 'Price' },
  { title: 'Timestamp' },
  { title: 'Action' },
];
export default function OpsDashboard(props) {
  // $.DataTable = require('datatables.net');
  const [plusIcon, setPlusIcon] = useState(false);
  const [requirementModal, setRequirementModal] = useState({ show: true });
  // require("datatables.net-responsive")(window);
  const tableRef = useRef();
  const tableName = 'opsDashboardTable';

  useEffect(() => {
    function handleResize() {
      let getClass = document.getElementById('opsDashboardTable');
      console.log(getClass.className, 'getClassgetClass');
      if ('display dataTable no-footer dtr-inline collapsed' === getClass.className) {
        setPlusIcon(true);
      } else {
        setPlusIcon(false);
      }
    }
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log(tableRef.current);

    const table = new DataTable(`#${tableName}`, {
      details: {
        renderer: $.fn.dataTable.Responsive.renderer.listHiddenNodes(),
      },
      columnDefs: [
        {
          targets: -1,
          render: function (data, type, row, meta) {
            return (
              '<input type="button" class="edit" id=n-"' +
              meta.row +
              '" value="EDIT"/><input type="button" class="opsverify" id=n-"' +
              meta.row +
              '" value="OPS VERIFY"/><input type="button" class="remove" id=n-"' +
              meta.row +
              '" value="Remove"/>'
            );
          },
        },
        // {
        //   targets: -1,
        //   createdCell: (td, cellData, rowData, row, col) => {
        //     ReactDOM.render(
        //       <button
        //         onClick={() =>{openCloseModal({ rowID: rowData.RowID, code: rowData.ProdCode })}}
        //         data-toggle="tooltip"
        //         data-placement="right"
        //         title="Delete Item From Cart"
        //         className="btn btn-sm btn-danger"
        //       >
        //         <i className="fas fa-times fa-lg"></i>
        //       </button>,
        //       td
        //     );
        //   },
        // },
      ],
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

  $('#opsDashboardTable tbody').on('click', '.edit', function () {
    var id = $(this).attr('id').match(/\d+/)[0];
    var data = $('#opsDashboardTable').DataTable().row(id).data();
    console.log(data[0]);
    openCloseModal();
  });
  $('#opsDashboardTable tbody').on('click', '.opsverify', function () {
    var id = $(this).attr('id').match(/\d+/)[0];
    var data = $('#opsDashboardTable').DataTable().row(id).data();
    console.log(data[5]);
    openCloseModal();
  });
  const openCloseModal = () => {
    console.log('2222');
    setRequirementModal({ show: true });
  };
  return (
    <>
      <div className="opspage">
        <div>
          <Form className="">
            <Form.Group className="mb-3 group-two" controlId="formPlaintextEmail">
              <Form.Group>
                <Select
                  className="mb-3 me-2 input-div"
                  options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                  // onChange={handleTypeSelect}
                  // value={organisationOptions.filter(function (option) {
                  //   return option.value === selectedOption;
                  // })}
                  label="Sector"
                  id="Sector"
                  placeholder="Select Sector"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPlaintext">
                <Select
                  className="mb-3 me-2 input-div"
                  options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
                  // onChange={handleTypeSelect}
                  // value={organisationOptions.filter(function (option) {
                  //   return option.value === selectedOption;
                  // })}
                  label="Sector"
                  id="Sector"
                  placeholder="Select Sector"
                />
              </Form.Group>

              <Form.Group className="mb-3 me-2 input-div" controlId="formPlaintext">
                <Button className="btn btn-theme">Add Row</Button>
              </Form.Group>
            </Form.Group>
          </Form>
        </div>
        <div>
          <table className="display" width="100%" id={tableName} ref={tableRef}>
            <thead>
              <tr>
                {columnsList.map((item, index) => {
                  return <th key={index}>{item.title}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JSW Paints Private Limited</td>
                <td>NA Reason:not given test</td>
                <td>
                  <span>Asian Paints Ltd </span>
                  <br />
                  <span>JSW Paints Private Limited</span>
                </td>
                <td>6-9 months</td>
                <td>More Than % years</td>
                <td>as soon as possible</td>
                <td>Raw Lead</td>
                <td>
                  <BsFillChatDotsFill size={20} className="icons" />
                </td>
                <td>
                  <BsFillChatDotsFill size={20} className="icons" />
                </td>
                <td className="text-left">
                  <b>Name:</b> shahid <br />
                  <b>Number:</b> 7006501835
                </td>
                <td>Bharti AXA Life Insurence company</td>
                <td>Bharat ViKas Group User</td>
                <td>No Requirement + Feedback + Subcription</td>
                <td>5000</td>
                <td className="span-box">
                  {' '}
                  <span className="span-tag">
                    <span>Submitted: Jun 23, 2022 11:31:31 AM </span>
                    <br></br>
                    <span>Ops Verify: Jun 23, 2022 11:31:31 AM </span>
                    <br></br>
                    <span> Ops Verify Name:AMAN PATIDAR </span>
                  </span>
                </td>
                <td>
                  {/* <span>
                  <BsCheckLg size={20} className="icons" />
                </span>
                <span>
                  <BsPencilSquare
                    className="icons"
                    id="btn"
                    size={20}
                    onClick={(e) => {
                      openCloseModal(e);
                    }}
                  />
                </span>
                <span>
                  <BsFillXCircleFill className="icons" size={20} />
                </span> */}
                </td>
              </tr>
              <tr>
                <td>JSW Paints Private Limited</td>
                <td>NA Reason:not given</td>
                <td>
                  <span>Asian Paints Ltd</span>
                  <br></br>
                  <span>JSW Paints Private Limited</span>
                </td>
                <td>6-9 months</td>
                <td>More Than % years</td>
                <td>as soon as possible</td>
                <td>Raw Lead</td>
                <td>
                  <BsFillChatDotsFill className="icons" size={20} />
                </td>
                <td>
                  <BsFillChatDotsFill className="icons" size={20} />
                </td>
                <td>Name: shahid Number: 7006501835</td>
                <td>Bharti AXA Life Insurence company</td>
                <td>Bharat ViKas Group User</td>
                <td>No Requirement + Feedback + Subcription</td>
                <td>5000</td>
                <td>
                  <span className="span-tag">
                    <span>Submitted: Jun 23, 2022 11:31:31 AM6854654 </span>
                    <br></br>
                    <span>Ops Verify: Jun 23, 2022 11:31:31 AM </span>
                    <br></br>
                    <span> Ops Verify Name:AMAN PATIDAR</span>
                  </span>
                </td>
                <td>
                  {/* <span>
                  <BsCheckLg className="icons" size={20} />
                </span>
                <span>
                  <BsPencilSquare
                    className="icons"
                    id="btn"
                    size={20}
                    onClick={(e) => {
                      openCloseModal(e);
                    }}
                  />
                </span>
                <span>
                  <BsFillXCircleFill className="icons" size={20} />
                </span> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Modal
          show={requirementModal.show}
          onHide={(e) => {
            setRequirementModal({ show: false });
          }}
          className="ops-edit-modal modify-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RequirementEditModal />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
