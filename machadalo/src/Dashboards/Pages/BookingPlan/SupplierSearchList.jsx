import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  finalSupplierListAtom,
  showFinalizedListAtom,
  supplierSearchListAtom,
} from '../../_states';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { Button } from 'react-bootstrap';
import DataNotFound from '../../common/DataNotFound/DataNotFound';
import { BsFillTrashFill } from 'react-icons/bs';

export default function SupplierSearchList() {
  const suppliersData = useRecoilValue(supplierSearchListAtom);
  const showFinalizedList = useRecoilValue(showFinalizedListAtom);
  const [finalSupplierList, setFinalSupplierList] = useRecoilState(finalSupplierListAtom);

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
                  addTofinalSupplierList(row, index);
                }}
              >
                Add
              </Button>
            ) : (
              <div className="action-icon">
                <span>
                  <BsFillTrashFill
                    onClick={(e) => {
                      removeSupplier(row, index);
                    }}
                  />
                </span>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const addTofinalSupplierList = (row) => {
    setFinalSupplierList([...finalSupplierList, row]);
    console.log(finalSupplierList, 'finalSupplierListfinalSupplierList');
  };

  const removeSupplier = (row) => {
    console.log(row, 'rowrowrow');
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
          <ReactBootstrapTable headerData={Header} rowData={finalSupplierList} />
        ) : (
          <DataNotFound message="No Supplier Found" />
        )}
      </div>
    );
  }
}
