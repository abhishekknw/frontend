import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionCreators from './../actions';
import B2bRoutes from '../B2bDashboard/B2bRoutes/routes'
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(B2bRoutes);