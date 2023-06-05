import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginations = (props) => {
  const { pageSize, totalItems, pageNo, onPageChange } = props;
  const numOfPages = Math.ceil(totalItems / pageSize);
  if (numOfPages <= 1) return null;

  return (
    <Stack spacing={2}>
      <Pagination
        className="page-link pt-3 pb-3"
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

export default Paginations;
