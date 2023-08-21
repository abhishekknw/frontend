import React from 'react';
const style = {
  color: '#3e59e3',
  padding: '10px 15px',
  marginBottom: '20px',
  fontWeight: '800',
  fontSize: '20px',
  padding: '10px 0px',
  borderBottom: 'solid 1px #3e59e3',
  backgroundColor: '#fff',
};
export default function TableHeader(props) {
  return (
    <div className={`text-center`} style={style}>
      <h4>{props?.headerValue?.toUpperCase()}</h4>
    </div>
  );
}
