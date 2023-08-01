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
        className="page-link dash-pagination pt-3 pb-3"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        page={pageNo}
        onChange={onPageChange}
        rowsperpage={pageSize}
        count={numOfPages}
      />
    </Stack>
  );
};

export default Paginations;

// import React from 'react';
// import ReactPaginate from 'react-paginate';

// const Paginations = (props) => {
//   const { pageNo, pageSize, totalItems, onPageChange } = props;
//   const numOfPages = Math.ceil(totalItems / pageSize);
//   if (numOfPages <= 1) return null;
//   return (
//     <ReactPaginate
//       pageCount={numOfPages}
//       initialPage={pageNo}
//       onPageChange={onPageChange}
//       activeClassName={'active'}
//       disableInitialCallback={true}
//     />
//   );
// };

// export default Paginations;
