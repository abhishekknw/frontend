import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const CommonTable = ({ id, columnsData, rowData }) => {
  return (
    <div className='v-middle'>
      <BootstrapTable
        keyField={id}
        data={rowData}
        columns={columnsData}
      />
    </div>
  );
}

export default CommonTable;