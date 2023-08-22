import React from 'react';

export default function DataNotFound(props) {
  return <div>{!props?.message ? 'No Record Found!' : props?.message}</div>;
}
