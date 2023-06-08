import React, { useMemo, useState } from 'react';
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
import CommonTable from '../Table/CommonTable';
import EmailModal from '../common/Modals/EmailModal';
import WhatsappModal from '../common/Modals/WhatsappModal';
import { showHideModalAtom } from '../_states/';
import { useRecoilState } from 'recoil';

export default function FosRmTable(props) {
  //   const NestedHeaderData = [
  //     {
  //       name: 'S.No.',
  //     },
  //     {
  //       name: 'Lead Source',
  //     },
  //     {
  //       name: 'Total Lead Count Shared',
  //     },
  //     {
  //       name: 'Lead Accepted By QA',
  //     },
  //     {
  //       name: 'Lead Accepted By Client',
  //     },
  //     {
  //       name: 'Action',
  //     },
  //   ];
  //   const FosRmBodyData = () => {
  //     let data = [
  //       {
  //         sno: '1.1',
  //         type: 'FOS',
  //         leadCount: '5000',
  //         leadQA: '3000',
  //         leadClient: '3000',
  //         action: (
  //           <div>
  //             <div className="action-icon">
  //               <span>
  //                 <BsEnvelopeFill />
  //               </span>
  //               <span>
  //                 <BsArrowDownCircle />
  //               </span>
  //               <span>
  //                 <BsWhatsapp />
  //               </span>
  //             </div>
  //           </div>
  //         ),
  //       },
  //       {
  //         sno: '1.2',
  //         type: 'RM',
  //         leadCount: '5000',
  //         leadQA: '3000',
  //         leadClient: '3000',
  //         action: (
  //           <div>
  //             <div className="action-icon">
  //               <span>
  //                 <BsEnvelopeFill />
  //               </span>
  //               <span>
  //                 <BsArrowDownCircle />
  //               </span>
  //               <span>
  //                 <BsWhatsapp />
  //               </span>
  //             </div>
  //           </div>
  //         ),
  //       },
  //     ];

  //     let body = data.map((ele, key) => {
  //       return (
  //         <>
  //           <tr>
  //             <td></td>
  //             <td>{ele.sno}</td>
  //             <td>{ele.type}</td>
  //             <td>{ele.leadCount}</td>
  //             <td>{ele.leadQA}</td>
  //             <td>{ele.leadClient}</td>
  //             <td>{ele.action}</td>
  //           </tr>
  //         </>
  //       );
  //     });

  //     return body;
  //   };

  // const [showHideModal, setshowHideModal] = useState({
  //   EmailModal: false,
  //   WhatsAppModal:false
  // });
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);

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
  return (
    <>
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
                  {/* <div className="action-icon">
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
                    <span onClick={(e)=>{
                      openWhatsAppModal();
                    }}>
                      <BsWhatsapp />
                    </span>
                  </div> */}
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
                <td>1.2</td>
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
