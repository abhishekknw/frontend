import React from 'react';

const GridHeader = (props) => {
  return (
    <div className="list__title" style={{ marginTop: props.headerStyle || '6em' }}>
      <h3>{props.headerValue}</h3>
    </div>
  );
};

export default GridHeader;