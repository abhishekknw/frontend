import React from 'react';
import '../bootstrap-iso.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { get } from 'lodash';
import GridHeader from '../GridHeader';

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
      expandRowBgColor: '#c2efef',
      onlyOneExpanding: true,
      paginationShowsTotal: this.renderPaginationShowsTotal,
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      onRowClick: this.renderRow,
    };
    return (
      <div className="bootstrap-iso">
        {this.props.headerValue && this.props.headerValue.length > 0 && (
          <GridHeader headerValue={this.props.headerValue} />
        )}
        <BootstrapTable
          data={this.props.data}
          pagination={this.props.pagination}
          hover
          headerStyle={{ backgroundColor: '#c7c7c7c9' }}
          trStyle={{ cursor: 'pointer' }}
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
        >
          {columns &&
            columns.map((column, idx) => {
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
