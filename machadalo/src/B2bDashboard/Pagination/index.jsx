import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationConstant = (props) => {
  const { pageSize, totalItems, pageNo, onPageChange } = props;
  const numOfPages = Math.ceil(totalItems / pageSize);
  if (numOfPages <= 1) return null;

  return (
    <Stack spacing={2}>
      <Pagination
        className="page-link"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        page={pageNo}
        onChange={onPageChange}
        rowsPerPage={pageSize}
        count={numOfPages}
      />
    </Stack>
  );
};

export default PaginationConstant;
