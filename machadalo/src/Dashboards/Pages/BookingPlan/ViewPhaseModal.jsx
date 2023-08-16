import React, { forwardRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions';
import { SupplierPhaseListAtom } from '../../_states';
import { useRecoilState } from 'recoil';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import dayjs from 'dayjs';
import { BsFillTrashFill, BsFillCalendarDateFill } from 'react-icons/bs';
import DatePicker from 'react-datepicker';

export default function ViewPhaseModal() {
  const BookingApi = BookinPlanActions();
  const [supplierPhaseList, setSupplierPhaseList] = useRecoilState(SupplierPhaseListAtom);
  const addNewPhase = { phase_no: '', start_date: '', end_date: '' };

  function getSupplierPhase() {
    BookingApi.getSupplierPhase();
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input btn btn-primary" onClick={onClick} ref={ref}>
      <span>{value ? value : ''}</span>
      <BsFillCalendarDateFill sx={{ marginLeft: '5px' }} />
    </div>
  ));
  const handleSelectDate = (date, row) => {
    console.log(date, row);
  };

  const phaseHeader = [
    {
      title: '#',
      accessKey: 'index',
      action: function (row, index) {
        return index + 1;
      },
    },
    {
      title: 'Phases',
      accessKey: 'phase_no',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {/* <span>{row?.phase_no}</span>{' '} */}
            <Form.Control
              type="text"
              id="phase_no"
              aria-describedby="phase_no"
              value={row?.phase_no}
            />
          </div>
        );
      },
    },
    {
      title: 'Start Date',
      accessKey: 'start_date',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {/* <span> {dayjs(row?.start_date).format('DD-MM-YYYY')}</span> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={row?.start_date ? new Date(row?.start_date) : ''}
              onChange={(date) => handleSelectDate(date, row)}
              customInput={<ExampleCustomInput />}
            />
          </div>
        );
      },
    },
    {
      title: 'End Date',
      accessKey: 'end_date',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {/* <span>{dayjs(row?.end_date).format('DD-MM-YYYY')}</span> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={row?.end_date ? new Date(row?.end_date) : ''}
              onChange={(date) => handleSelectDate(date, row)}
              customInput={<ExampleCustomInput />}
            />
          </div>
        );
      },
    },
    {
      title: 'Remove',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return (
          <div className="action-icon">
            <span>
              <BsFillTrashFill />
            </span>
          </div>
        );
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
            <Button
              className="btn me-3 btn-primary"
              onClick={(e) => {
                setSupplierPhaseList([...supplierPhaseList, addNewPhase]);
              }}
            >
              Add
            </Button>
          </span>
          <span>
            <Button
              className="btn btn-success"
              variant="success"
              onClick={(e) => {
                BookingApi.saveSupplierPhaseList(supplierPhaseList);
              }}
            >
              Save
            </Button>
          </span>
        </div>
      </div>
    </>
  );
}
