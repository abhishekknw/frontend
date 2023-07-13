// import React, { useEffect, useState, useRef } from "react";
// //import { ToastContainer, toast } from 'react-toastify';

// import $ from "jquery";
// import DataTable from "datatables.net";
// import 'datatables.net-responsive'
// $.DataTable = DataTable;

// // require("datatables.net-responsive")(window);
// // $.DataTable = require("datatables.net")();

// const OpsDashboard = () => {
//   const tableRef = useRef();
//   const PiezaRef = useRef();
//   const id = 503100089;
//   const [ArrayEditar, setArrayEditar] = useState([]);
//   const [isInputs, setIsInputs] = useState({
//     Pieza: "",
//     Descripción: "",
//     Ubicación: "",
//     Cantidad: "",
//     bodega: "",
//     Imagen: ""
//   });

//   //console.log(id)

//   useEffect(() => {
//     try {
//       const FetchEditar = async () => {
//         const Editar = await fetch(
//           `  https://api.npoint.io/4865b7fe7d1aca9736a2`,
//           {
//             method: "get",
//             headers: {
//               "content-type": "application/json"
//             }
//           }
//         );
//         const arrayEditar = await Editar.json();
//         console.log(arrayEditar,"1111");
//         setArrayEditar(arrayEditar[0]);
//       };
//       FetchEditar();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [id]);

//   const GetDataTable = () => {
//     console.log("TABLE", tableRef.current);
//     $(tableRef.current).DataTable({
//       dom: "",
//       rowReorder: {
//         selector: "td:nth-child(2)"
//       },
//       responsive: true
//     });
//   };
//   //evento click de prueba
//   /*const Table = $(tableRef.current).DataTable({
//         dom: '',
//         responsive: true,
//         bDestroy: true
//      })
//       $(tableRef.current).on( 'click', 'li', function (e) {
//         alert( Table.cell( $(this).closest('tr').prev('tr'), $(this).attr('data-dtr-index') ).data() )
//         e.stopPropagation()
//        } );

//        $(tableRef.current).on( 'click', 'td', function () {
//         alert( Table.cell( this ).data() );

//    } );*/

//   const HandleChangeInputs = (e) => {
//     console.log(e.target.value);
//     // setIsInputs({
//     //   ...isInputs,
//     //   [e.target.name]: e.target.value
//       /*Pieza: ArrayEditar.Pieza,
//         Descripción: ArrayEditar.Descripción,
//         Ubicación: ArrayEditar.Ubicación*/
//       //Imagen1: ArrayEditar.Imagen1
//     // });
//   };

//   const HandleSubmitInputs = () => {
//     alert(JSON.stringify(isInputs));
//     alert(JSON.stringify(ArrayEditar));
//     alert(PiezaRef.current.value);
//   };

//   // const Popup = () => {
//   //   window.open(
//   //     "http://consulrep-client.herokuapp.com/",
//   //     "",
//   //     "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
//   //   );
//   // };

//   return (
//     <div>
//       <div className="container">
//         <br></br>
//         <table
//           className="table table-striped"
//           width="100%"
//           ref={tableRef}
//           id="table"
//           onLoad={GetDataTable}
//         >
//           <thead className="bg-secondary">
//             <tr>
//               <th>Current</th>
//               <th>DESCRIPCIÓN</th>
//               <th>CLASE</th>
//               <th>REPARABLE</th>
//               <th>CRITICIDAD</th>
//               <th>IMAGEN</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr>
//               <td>Kriti Test Sector
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="Pieza"
//                   ref={PiezaRef}
//                   defaultValue={ArrayEditar.Pieza}
//                   onChange={HandleChangeInputs}
//                   onClick={() => alert('Oprima boton "EDITAR" para modificar')}
//                 />
//               </td>
//               <td>Kriti Preffered partner
//                 <textarea
//                   disabled
//                   className="form-control"
//                   type="text"
//                   name="Descripción"
//                   defaultValue={ArrayEditar.Descripción}
//                   onChange={HandleChangeInputs}
//                 />
//               </td>
//               <td>Kriti Other partner
//                 <input
//                   disabled
//                   className="form-control"
//                   type="text"
//                   name="Ubicación"
//                   defaultValue={ArrayEditar.Clase}
//                   onChange={HandleChangeInputs}
//                 />
//               </td>
//               <td>L4 commentts for testign purpose
//                 <input
//                   disabled
//                   className="form-control"
//                   type="text"
//                   name="Cantidad"
//                   defaultValue={ArrayEditar.Reparable}
//                   onChange={HandleChangeInputs}
//                 />
//               </td>
//               <td>L5 comments for testig Opsverfied dashboard
//                 <input
//                   disabled
//                   className="form-control"
//                   type="text"
//                   name="Cricidad"
//                   defaultValue={ArrayEditar.Criticidad}
//                   onChange={HandleChangeInputs}
//                 />
//               </td>

//               <td>
//                 other details in last column test show in responsive ways
//                 <div className="inner">
//                   <img
//                     src={
//                       "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/R1229471-01.jpg"
//                     }
//                     alt=""
//                     width="260px"
//                   ></img>
//                   <input
//                     disabled
//                     className="form-control"
//                     type="text"
//                     name="Imagen"
//                     defaultValue={ArrayEditar.Imagen}
//                     onChange={HandleChangeInputs}
//                   />
//                   <form action="">
//                     <input className="form-control" type="file" name="imagen" />
//                     <button className="btn btn-info" type="submit">
//                       Upload image
//                     </button>
//                   </form>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <br />
//         {/* <button className="btn btn-warning w-100" onClick={Popup}>
//           EDITAR
//         </button> */}
//         <br />
//       </div>
//     </div>
//   );
// };
// export default OpsDashboard;
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-responsive';
// import 'datatables.net-plugins/sorting/anti-the.mjs';
import DataTable from 'datatables.net-dt';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';

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
  const [requirementModal ,setRequirementModal] = useState({show:true})
  // require("datatables.net-responsive")(window);
  const tableRef = useRef();
  // console.log(tableRef)
  const tableName = 'table1';
  useEffect(() => {
    function handleResize() {
      let getClass = document.getElementById('table1');
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
      // data: dataSet,
      // columns: [
      //   { title: 'Action' },
      // ],
      // columnDefs: [
      //   {
      //     target: 0,
      //     type: 'anti-the',
      //   },
      // ],
      info: false,
      // select: true,
      // dom: 'Bfrtip',
      // ordering: false,
      paging: false,
      responsive: true,
      searching: false,
      // rowReorder: {
      //   selector: 'td:nth-child(2)',
      // },
    });
    // Extra step to do extra clean-up.
    return function () {
      console.log('Table destroyed');
      table.destroy();
    };
  }, []);

  const openCloseModal = () => {
    alert(2)
    console.log("2222")
    setRequirementModal({ show: true });
  }
  return (
    <>
      <div>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Select
              className="mb-3"
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
                <span>Asian Paints Ltd </span><br></br>
                <span>JSW Paints Private Limited</span>
                </td>
              <td>6-9 months</td>
              <td>More Than % years</td>
              <td>as soon as possible</td>
              <td>Raw Lead</td>
              <td>
                <BsFillChatDotsFill  size={20} className='icons'/>
              </td>
              <td>
                <BsFillChatDotsFill  size={20} className='icons'/>
              </td>
              <td>Name: shahid Number: 7006501835</td>
              <td>Bharti AXA Life Insurence company</td>
              <td>Bharat ViKas Group User</td>
              <td>No Requirement + Feedback + Subcription</td>
              <td>5000</td>
              <td>
                {' '}
                <span>Submitted: Jun 23, 2022 11:31:31 AM </span>
                <br></br>
                <span>Ops Verify: Jun 23, 2022 11:31:31 AM </span>
                <br></br>
                <span> Ops Verify Name:AMAN PATIDAR</span>
              </td>
              <td>
                <span>
                  <BsCheckLg  size={20} className='icons'/>
                </span>
                <span>
                  <BsPencilSquare className='icons'  size={20} onClick={(e)=>{openCloseModal(e)}}/>
                </span>
                <span>
                  <BsFillXCircleFill className='icons'  size={20}/>
                </span>
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
                <BsFillChatDotsFill className='icons'  size={20}/>
              </td>
              <td>
                <BsFillChatDotsFill className='icons'  size={20}/>
              </td>
              <td>Name: shahid Number: 7006501835</td>
              <td>Bharti AXA Life Insurence company</td>
              <td>Bharat ViKas Group User</td>
              <td>No Requirement + Feedback + Subcription</td>
              <td>5000</td>
              <td>
                <span>Submitted: Jun 23, 2022 11:31:31 AM </span>
                <br></br>
                <span>Ops Verify: Jun 23, 2022 11:31:31 AM </span>
                <br></br>
                <span> Ops Verify Name:AMAN PATIDAR</span>
              </td>
              <td>
                <span>
                  <BsCheckLg className='icons'  size={20}/>
                </span>
                <span>
                  <BsPencilSquare className='icons'  size={20} onClick={(e)=>{openCloseModal(e)}}/>
                </span>
                <span>
                  <BsFillXCircleFill className='icons'  size={20} />
                </span>
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
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RequirementEditModal />
        </Modal.Body>
      </Modal>
    </>
  );
}
