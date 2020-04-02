import React, { useState } from 'react';
import { Default } from 'react-awesome-spinners';

const LoadingWrapper = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ margin: 'auto', textAlign: 'center', marginTop: '10%' }}>
      {loading && <Default color={'rgb(232, 68, 120)'} />}
    </div>
  );
};

export default LoadingWrapper;
