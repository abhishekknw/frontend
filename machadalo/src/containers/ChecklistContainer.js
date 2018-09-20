import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActionCreators from './../actions';

import Checklist from './../components/Checklist';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    supplier: state.supplier,
    checklist: state.checklist
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);
