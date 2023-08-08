import React from 'react';
const style = {
  color: '#e84478',
  padding: '10px 15px',
  marginBottom: '20px',
  fontWeight: '700',
  fontSize: '20px',
  padding: '10px 0px',
  borderBottom: 'solid 1px #e84478',
};
export default function TableHeader(props) {
  return (
    <div className="text-center" style={style}>
      <h4>{props?.headerValue?.toUpperCase()}</h4>
    </div>
  );
}
