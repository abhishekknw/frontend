import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  finalSupplierListAtom,
  showFinalizedListAtom,
  supplierSearchListAtom,
  filtersCheckBoxAtom,
} from '../../_states';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { Button } from 'react-bootstrap';
import DataNotFound from '../../common/DataNotFound/DataNotFound';
import { BsFillTrashFill } from 'react-icons/bs';
import { BookinPlanActions } from '../../_actions';
import { BookingFunctions } from './BookingFunctions';

export default function SupplierSearchList() {
  const BookingApi = BookinPlanActions();
  const UpdateData = BookingFunctions();
  const suppliersData = useRecoilValue(supplierSearchListAtom);
  const showFinalizedList = useRecoilValue(showFinalizedListAtom);
  const [finalSupplierList, setFinalSupplierList] = useRecoilState(finalSupplierListAtom);
  const filtersCheckbox = useRecoilValue(filtersCheckBoxAtom);

  const Header = [
    {
      title: '#',
      accessKey: 'index',
      sort: false,
      action: function (row, index) {
        return index + 1;
      },
    },
    {
      title: 'NAME',
      accessKey: 'name',
      sort: false,
    },
    {
      title: 'CITY',
      accessKey: 'city',
      sort: false,
    },
    {
      title: 'AREA',
      accessKey: 'area',
      sort: false,
    },
    {
      title: 'SUB-AREA',
      accessKey: 'subarea',
      sort: false,
    },
    {
      title: 'ACTION',
      accessKey: 'ACTION',
      sort: false,
      action: function (row, index) {
        return (
          <div>
            {showFinalizedList ? (
              <Button
                className="btn btn-primary"
                onClick={(e) => {
                  UpdateData.addSupplierList(row, index);
                }}
              >
                Add
              </Button>
            ) : (
              <div className="action-icon">
                <span
                  onClick={(e) => {
                    UpdateData.removeSupplierList(row, index);
                  }}
                >
                  <BsFillTrashFill />
                </span>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const handleSubmit = async () => {
    await BookingApi.submitSupplierList();
  };

  if (showFinalizedList) {
    return (
      <div>
        {suppliersData.length > 0 ? (
          <ReactBootstrapTable headerData={Header} rowData={suppliersData} />
        ) : (
          <DataNotFound message="No Supplier Found" />
        )}
      </div>
    );
  } else {
    return (
      <div>
        {finalSupplierList.length > 0 ? (
          <>
            <ReactBootstrapTable headerData={Header} rowData={finalSupplierList} />
            <Button
              className="btn btn-primary"
              onClick={(e) => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <DataNotFound message="No Data Found" />
        )}
      </div>
    );
  }
}
