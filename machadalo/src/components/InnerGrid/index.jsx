import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class InnerGrid extends React.Component {
  render() {
    const { columns, data } = this.props;
    return (
      <div style={{ backgroundColor: 'white' }}>
        <BootstrapTable data={data}>
          {columns &&
            columns.map((column, idx) => {
              return (
                <TableHeaderColumn
                  isKey={idx == 0 ? true : false}
                  dataField={column.dataField}
                  width={column.width || '200px'}
                  hidden={column.hidden === true ? true : false}
                  key={idx}
                  className={column.className}
                  columnClassName={column.columnClassName}
                  dataAlign={column.dataAlign || 'center'}
                >
                  {column.text}
                </TableHeaderColumn>
              );
            })}
        </BootstrapTable>
      </div>
    );
  }
}

export default InnerGrid;
