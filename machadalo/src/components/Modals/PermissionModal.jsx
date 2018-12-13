import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';

import './index.css';

import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import TextFieldIcon from '@material-ui/icons/TextFields';
import Tree, { getTreeLeafDataByIndexArray } from 'material-ui-tree';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    maxHeight: '550px',
    minWidth: '100px',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px 10px 10px'
  }
};

const classes = {
  container: 'tree-modal',
  icon: 'tree-icon',
  leaf: 'TreeDemo-leaf-179'
};

export default class PermissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        entityName: 'All Campaign',
        type: 'campaign',
        entityId: 'all',
        data: []
      },
      userOptions: [],
      selectedUser: {
        label: undefined,
        value: undefined
      }
    };
    this.onSelectUser = this.onSelectUser.bind(this);
  }

  componentWillMount() {
    if (this.props.createPermission) {
      this.props.getUsersList();
    }
  }

  componentDidUpdate() {
    if (
      (!this.state.data.data.length && this.props.dataInfo.length) ||
      (this.state.data.data.length &&
        this.props.dataInfo.length &&
        this.state.data.data[0].entityId !== this.props.dataInfo[0].entityId)
    ) {
      let dataInfo = this.state.data;
      dataInfo.data = this.props.dataInfo;
      this.setState({
        data: dataInfo
      });
    }
    if (
      (!this.state.userOptions.length && this.props.user.userList.length) ||
      (this.state.userOptions.length &&
        this.props.user.userList.length &&
        this.state.userOptions[0].value !== this.props.user.userList[0].id)
    ) {
      let userOptions = [];
      this.props.user.userList.forEach(userData => {
        userOptions.push({
          label: userData.first_name + ' ' + userData.last_name,
          value: userData.id
        });
      });
      this.setState({
        userOptions
      });
    }
  }

  onSelectUser(value) {
    this.setState({
      selectedUser: value
    });
  }

  requestTreeLeafChildrenData = (leafData, chdIndex, doExpand) => {
    doExpand();
  };

  renderTreeLeafLabel = (leafData, expand) => {
    const { entityName, type } = leafData;
    if (type === 'campaign') {
      if (!expand) {
        return (
          <Typography viriant="body1" className={classes.leaf}>
            <FolderIcon className={classes.icon} />
            {entityName}
          </Typography>
        );
      }
    }
    return (
      <Typography viriant="body1" className={classes.leaf}>
        <FolderOpenIcon className={classes.icon} />
        {entityName}
      </Typography>
    );
  };

  getTreeLeafActionsData = (leafData, chdIndex, expand) => {
    return [
      {
        icon: <ClearIcon className="tree-action" />,
        hint: 'None',
        className:
          'permission-icon' +
          (leafData.permission === 'None' ? ' permission-selected' : ''),
        onClick: () => {
          const data = { ...this.state.data };
          const leaf = getTreeLeafDataByIndexArray(data, chdIndex, 'data');
          leaf.permission = 'None';
          if (leaf.data && leaf.data.length) {
            leaf.data.forEach(leafData => {
              leafData.permission = 'None';
              if (leafData.data && leafData.data.length) {
                leafData.data.forEach(childData => {
                  childData.permission = 'None';
                });
              }
            });
          }
          this.setState({ data });
        }
      },
      {
        icon: <EditIcon className="tree-action" />,
        hint: 'Edit',
        className:
          'permission-icon' +
          (leafData.permission === 'Edit' ? ' permission-selected' : ''),
        onClick: () => {
          const data = { ...this.state.data };
          const leaf = getTreeLeafDataByIndexArray(data, chdIndex, 'data');
          leaf.permission = 'Edit';
          if (leaf.data && leaf.data.length) {
            leaf.data.forEach(leafData => {
              leafData.permission = 'Edit';
              if (leafData.data && leafData.data.length) {
                leafData.data.forEach(childData => {
                  childData.permission = 'Edit';
                });
              }
            });
          }
          this.setState({ data });
        }
      },
      {
        icon: <TextFieldIcon className="tree-action" />,
        hint: 'Fill',
        className:
          'permission-icon' +
          (leafData.permission === 'Fill' ? ' permission-selected' : ''),
        onClick: () => {
          const data = { ...this.state.data };
          const leaf = getTreeLeafDataByIndexArray(data, chdIndex, 'data');
          leaf.permission = 'Fill';
          if (leaf.data && leaf.data.length) {
            leaf.data.forEach(leafData => {
              leafData.permission = 'Fill';
              if (leafData.data && leafData.data.length) {
                leafData.data.forEach(childData => {
                  childData.permission = 'Fill';
                });
              }
            });
          }
          this.setState({ data });
        }
      }
    ];
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showPermissionModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal-title">
          <h3>User Permission</h3>
        </div>
        {this.props.createPermission ? (
          <div className="createform__form__inline">
            <div className="form-control">
              <label>*Select User</label>
              <br />
              <Select
                className="modal-select"
                options={this.state.userOptions}
                value={this.state.selectedUser}
                onChange={this.onSelectUser}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <Tree
          className={classes.container}
          data={this.state.data}
          labelName="entityName"
          valueName="entityId"
          childrenName="data"
          renderLabel={this.renderTreeLeafLabel}
          getActionsData={this.getTreeLeafActionsData}
          childrenCountPerPage={100}
        />
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn--danger"
            onClick={this.props.onClose}
          >
            Close
          </button>{' '}
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.props.onSubmit(this.state)}
          >
            Submit
          </button>
        </div>
      </Modal>
    );
  }
}
