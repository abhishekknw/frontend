import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';
const ReactPagination = (props) => {
  const { pageNo, pageSize, totalItems, onPageChange } = props;
  const numOfPages = Math.ceil(totalItems / pageSize);
  if (numOfPages <= 1) return null;
  return (
    <ReactPaginate
      pageCount={numOfPages}
      initialPage={pageNo}
      onPageChange={onPageChange}
      activeClassName={'active'}
      disableInitialCallback={true}
      nextLabel=">"
      previousLabel="<"
    />
  );
};

export default ReactPagination;
