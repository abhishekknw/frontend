import React from 'react';

class LoadingWrapper extends React.Component {
  render() {
    return (
      <div
        className="ui active centered inline loader"
        style={{ marginTop: '10%', color: 'brown' }}
      ></div>
    );
  }
}

export default LoadingWrapper;