import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions';
import { SupplierPhaseListAtom } from '../../_states';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import dayjs from 'dayjs';
import { BsFillTrashFill, BsFillCalendarDateFill } from 'react-icons/bs';
import DatePicker from 'react-datepicker';

export default function ViewPhaseModal(props) {
  const BookingApi = BookinPlanActions();
  const [supplierPhaseList, setSupplierPhaseList] = useRecoilState(SupplierPhaseListAtom);
  const addNewPhase = { phase_no: '', start_date: '', end_date: '' };
  const [validated, setValidated] = useState(false);
  const [editEnable, setEditEnable] = useState(true);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input btn btn-primary" onClick={onClick} ref={ref}>
      <span>{value ? value : ''}</span>
      <BsFillCalendarDateFill sx={{ marginLeft: '5px' }} />
    </div>
  ));
  const handleSelectStartDate = (date, row) => {
    let newList = supplierPhaseList.map((item) =>
      item?.id === row?.id ? { ...item, start_date: date } : item
    );
    setSupplierPhaseList(newList);
  };
  const handleSelectEndDate = (date, row) => {
    let newList = supplierPhaseList.map((item) =>
      item?.id === row?.id ? { ...item, end_date: date } : item
    );
    setSupplierPhaseList(newList);
  };

  const onPhaseChange = (e, row) => {
    let newList = supplierPhaseList.map((item) =>
      item?.id === row?.id ? { ...item, phase_no: e?.target?.value } : item
    );
    setSupplierPhaseList(newList);
  };

  const deleteSupplierPhaseObj = async (row, index) => {
    if (!row?.id) {
      let newList = [];
      for (let i in supplierPhaseList) {
        if (i != index) {
          newList.push(supplierPhaseList[i]);
        }
      }
      setSupplierPhaseList(newList);
    } else {
      await BookingApi.deletSupplierPhase(row, index);
    }
  };

  const OnSavePhase = (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   setValidated(true);
    // }
    // if (validated) {
    BookingApi.saveSupplierPhaseList(supplierPhaseList);
    // }
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
      title: 'PHASE',
      accessKey: 'phase_no',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {/* <span>{row?.phase_no}</span>{' '} */}
            {/* <Form noValidate validated={validated}> */}
            <Form.Control
              type="text"
              id="phase_no"
              aria-describedby="phase_no"
              value={row?.phase_no}
              onChange={(e) => {
                onPhaseChange(e, row);
              }}
              required
              disabled={editEnable}
            />
            {/* <Form.Control.Feedback type="invalid">Please Enter Phase</Form.Control.Feedback>
            </Form> */}
          </div>
        );
      },
    },
    {
      title: 'START DATE',
      accessKey: 'start_date',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            <Form noValidate validated={validated}>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={row?.start_date ? new Date(row?.start_date) : ''}
                onChange={(date) => handleSelectStartDate(date, row, 'start_date')}
                customInput={<ExampleCustomInput />}
                required
                disabled={editEnable}
              />
            </Form>
          </div>
        );
      },
    },
    {
      title: 'END DATE',
      accessKey: 'end_date',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {/* <span>{dayjs(row?.end_date).format('DD-MM-YYYY')}</span> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={row?.end_date ? new Date(row?.end_date) : ''}
              onChange={(date) => handleSelectEndDate(date, row, 'end_date')}
              minDate={new Date(row?.start_date)}
              customInput={<ExampleCustomInput />}
              disabled={editEnable}
            />
          </div>
        );
      },
    },
    {
      title: 'REMOVE',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return (
          <div className="action-icon">
            <span>
              <BsFillTrashFill
                onClick={(e) => {
                  deleteSupplierPhaseObj(row, index);
                }}
              />
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div>
        {supplierPhaseList && (
          <ReactBootstrapTable headerData={phaseHeader} rowData={supplierPhaseList} />
        )}
        <div>
          <span>
            <Button
              className="btn me-3 btn-primary"
              onClick={(e) => {
                setEditEnable(!editEnable);
              }}
            >
              Edit
            </Button>
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
                OnSavePhase(e);
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
