import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionCreators from './../actions';

import Layout from './../components/Layout';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    appearance: state.appearance
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
