import { Spinner } from 'react-bootstrap';

const LoadingWrapper = () => {
  return (
    <div style={{ margin: 'auto', textAlign: 'center', marginTop: '10%' }}>
      <Spinner animation="border" variant="primary" />{' '}
    </div>
  );
};
export default LoadingWrapper;
