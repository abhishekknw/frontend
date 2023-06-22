import React, { useMemo, useState } from 'react';
// import Table from 'react-bootstrap/Table';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const { styles } = props;

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
      {/* <Tr> */}
      <Td colSpan={styles?.colSpan} className="nested-leads-table-colspan ">
        <Table striped bordered hover className="nested-leads-table ">
          <Thead className="leads-tbody">
            <Tr>
              <Th>S.No.</Th>
              <Th>Lead Source</Th>
              <Th>Total Lead Count Shared</Th>
              <Th>Lead accepted by QA</Th>
              <Th>Lead Accepted by Client</Th>
              <Th> Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1.1</Td>
              <Td>FOS</Td>
              <Td>5000</Td>
              <Td>2500</Td>
              <Td>2000</Td>
              <Td>
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
              </Td>
            </Tr>
            <Tr>
              <Td>1.2</Td>
              <Td>RM</Td>
              <Td>5000</Td>
              <Td>2500</Td>
              <Td>2000</Td>
              <Td>
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
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Td>
      {/* </Tr> */}

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
