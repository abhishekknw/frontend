import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div style={{ backgroundColor: 'white' }}>
        {this.props.headerValue && this.props.headerValue.length > 0 && (
          <GridHeader headerValue={this.props.headerValue} />
        )}
        <BootstrapTable
          data={data}
          headerValue={`Supplier Details`}
          headerStyle={{ backgroundColor: '#c7c7c7c9' }}
          exportCsv={this.props.exportCsv}
          search={this.props.search}
          pagination={this.props.pagination}
          options={options}
          hover
        >
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
