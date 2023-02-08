import React from 'react';
import { get } from 'lodash';
// import '../bootstrap-iso.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import GridHeader from '../GridHeader';

class InnerGrid extends React.Component {
  renderPaginationShowsTotal(start, to, total) {
    return (
      <p style={{ color: '#6c757d' }}>
        Showing {start} to {to} of {total} Results
      </p>
    );
  }

  render() {
    const { columns, data } = this.props;
    const options = {
      paginationShowsTotal: this.renderPaginationShowsTotal,
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
    };
    return (
      <div className="bootstrap-iso" style={this.props.styles}>
        {this.props.headerValue && this.props.headerValue.length > 0 && (
          <GridHeader headerValue={this.props.headerValue} headerStyle={'1em'} />
        )}
        <BootstrapTable
          data={data}
          headerValue={`Supplier Details`}
          headerStyle={{ backgroundColor: 'rgba(199, 199, 199, 0.62)' }}
          exportCSV={this.props.exportCsv || false}
          search={this.props.search || false}
          pagination={this.props.pagination}
          options={options}
          hover={true}
          insertRow={this.props.showModal || false}
          version="4"
          striped={this.props.striped || false}
        >
          {columns &&
            columns.map((column, idx) => {
              const isNested = column.dataField.indexOf('.') >= 0;
              const formatter = isNested
                ? function(cell, row) {
                    return get(row, column.dataField);
                  }
                : undefined;
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
                  dataFormat={column.formatter || formatter}
                  dataSort={column.sort === true ? true : false}
                  row={column.row}
                  rowSpan={column.rowSpan}
                  colSpan={column.colSpan}
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
