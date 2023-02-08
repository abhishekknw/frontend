import React from 'react';
import { get } from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import GridHeader from '../GridHeader';
// import '../bootstrap-iso.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './index.css';

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  csvFormatter = (cell, row) => {
    return `${row.id}: ${cell} USD`;
  };

  renderPaginationShowsTotal(start, to, total) {
    return (
      <p style={{ color: '#6c757d' }}>
        Showing {start} to {to} of {total} Results
      </p>
    );
  }

  renderRow = (row) => {
    this.props.onRowClick(row);
  };

  expandColumnComponent = ({ isExpanded }) => {
    let content = '';
    content = isExpanded ? '(-)' : '(+)';
    return <div> {content} </div>;
  };

  render() {
    const columns = this.props.columns;
    const options = {
      expandRowBgColor: '#95b5d8',
      onlyOneExpanding: true,
      paginationShowsTotal: this.renderPaginationShowsTotal,
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      onRowClick: this.renderRow,
    };
    return (
      <div className="bootstrap-iso">
        {this.props.headerValue &&
          this.props.headerValue.length > 0 && <GridHeader headerValue={this.props.headerValue} />}
        <BootstrapTable
          data={this.props.data}
          pagination={this.props.pagination}
          hover={true}
          search={this.props.search}
          multiColumnSearch={true}
          exportCSV={this.props.exportCsv}
          options={options}
          expandableRow={this.props.isExpandableRow}
          expandComponent={this.props.expandComponent}
          expandColumnOptions={{
            expandColumnVisible: this.props.isExpandableRow,
            expandColumnComponent: this.expandColumnComponent,
            columnWidth: 50,
          }}
          headerStyle={{ backgroundColor: '#707f8c9e' }}
          trStyle={{ cursor: 'pointer' }}
          tableStyle={{ marginBottom: '0px' }}
          version="4"
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
                  dataSort={column.sort === false ? false : true}
                  hidden={column.hidden === true ? true : false}
                  key={idx}
                  className={column.className}
                  columnClassName={column.columnClassName}
                  row={column.row}
                  rowSpan={column.rowSpan}
                  colSpan={column.colSpan}
                  dataAlign={column.dataAlign || 'center'}
                  dataFormat={column.formatter || formatter}
                  export={column.export || true}
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

export default Grid;
