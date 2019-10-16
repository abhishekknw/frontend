import React from 'react';

const GridHeader = (props) => {
  return (
    <div className="list__title">
      <h4>{props.headerValue}</h4>
    </div>
  );
};

export default GridHeader;
