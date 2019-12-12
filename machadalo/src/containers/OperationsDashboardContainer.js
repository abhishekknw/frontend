import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionCreators from '../actions';

import OperationsDashboard from '../components/OperationsDashboard';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationsDashboard);
