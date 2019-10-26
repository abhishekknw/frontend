import React from 'react';

const GridHeader = (props) => {
  return (
    <div className="list__title" style={{ marginTop: '80px' }}>
      <h3>{props.headerValue}</h3>
    </div>
  );
};

export default GridHeader;
