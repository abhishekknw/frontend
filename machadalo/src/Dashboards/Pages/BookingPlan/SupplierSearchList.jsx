import React from 'react';
import { useRecoilValue } from 'recoil';
import { supplierSearchListAtom } from '../../_states';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
import { Button } from 'react-bootstrap';
import DataNotFound from '../../common/DataNotFound/DataNotFound';

export default function SupplierSearchList() {
  const suppliersData = useRecoilValue(supplierSearchListAtom);

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
        return <Button>Add</Button>;
      },
    },
  ];
  console.log(suppliersData, 'suppliersDatasuppliersDatasuppliersData');
  return (
    <div>
      {suppliersData.length > 0 ? (
        <ReactBootstrapTable headerData={Header} rowData={suppliersData} />
      ) : (
        <DataNotFound message="No Supplier Found" />
      )}
    </div>
  );
}
