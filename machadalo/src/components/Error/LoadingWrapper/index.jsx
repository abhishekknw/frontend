import React, { useState } from 'react';
// import { Default } from 'react-awesome-spinners';
import ClipLoader from "react-spinners/ClipLoader";

const LoadingWrapper = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ margin: 'auto', textAlign: 'center', marginTop: '10%' }}>
      {loading && <ClipLoader color={'rgb(232, 68, 120)'} />}
    </div>
  );
};

export default LoadingWrapper;
