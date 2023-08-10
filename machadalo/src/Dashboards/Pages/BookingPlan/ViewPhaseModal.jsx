import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions';
import { SupplierPhaseListAtom } from '../../_states';
import { useRecoilValue } from 'recoil';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import dayjs from 'dayjs';
export default function ViewPhaseModal() {
  const BookingApi = BookinPlanActions();
  const supplierPhaseList = useRecoilValue(SupplierPhaseListAtom);

  function getSupplierPhase() {
    BookingApi.getSupplierPhase();
  }

  const phaseHeader = [
    {
      title: '#',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return index + 1;
      },
    },
    {
      title: 'Phases',
      accessKey: 'phase_no',
      sort: false,
    },
    {
      title: 'Start Date',
      accessKey: 'start_date',
      sort: false,
      action: function (row, index) {
        return <span> {dayjs(row?.start_date).format('DD-MM-YYYY')}</span>;
      },
    },
    {
      title: 'End Date',
      accessKey: 'end_date',
      sort: false,
      action: function (row, index) {
        return <span>{dayjs(row?.start_date).format('DD-MM-YYYY')}</span>;
      },
    },
    {
      title: 'Remove',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return <Button className="btn btn-primary">Remove</Button>;
      },
    },
  ];
  console.log(supplierPhaseList, 'supplierPhaseList');

  useEffect(() => {
    getSupplierPhase();
  }, []);
  return (
    <>
      <div>
        {supplierPhaseList && (
          <ReactBootstrapTable headerData={phaseHeader} rowData={supplierPhaseList} />
        )}
        <div>
          <span>
            <Button className="btn me-3 btn-primary">Edit</Button>
          </span>
          <span>
            <Button className="btn me-3 btn-primary">Add</Button>
          </span>
          <span>
            <Button className="btn me-3 btn-success">Save</Button>
          </span>
        </div>
      </div>
    </>
  );
}
