import React from 'react';

const style = {
  color: '#e84478',
  padding: '10px 15px',
  marginBottom: '20px',
  borderBottom: 'solid 1px #e84478',
};

const GridHeader = (props) => {
  return (
    <div className="title" style={style}>
      <h4>{props.headerValue}</h4>
    </div>
  );
};

export default GridHeader;
