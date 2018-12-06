import React from 'react';
import Modal from 'react-modal';

import './index.css';

import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Tree, { getTreeLeafDataByIndexArray } from 'material-ui-tree';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    maxHeight: '500px',
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
    super();
    this.state = {
      data: {
        entityName: 'All Campaign',
        type: 'campaign',
        entityId: 'all',
        data: [],
        userPermissionId: undefined
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getUserPermission(this.props.modalUserId);
  }

  componentDidUpdate() {
    if (
      (!this.state.data.data.length &&
        this.props.settings.userPermission.length) ||
      (this.state.data.data.length &&
        this.props.settings.userPermission.length &&
        this.state.data.data[0].entityId !==
          this.props.settings.userPermission[0].entityId)
    ) {
      let dataInfo = this.state.data;
      dataInfo.data = this.props.settings.userPermission;
      this.setState({
        data: dataInfo,
        userPermissionId: this.props.settings.currentUserPermissionId
      });
    }
  }

  onSubmit() {
    let requestData = {
      id: this.state.userPermissionId,
      checklist_permissions: {
        campaigns: {},
        checklists: {}
      },
      user_id: this.props.modalUserId
    };
    this.state.data.data.forEach(campaignData => {
      if (
        campaignData.type === 'campaign' &&
        campaignData.permission !== 'None'
      ) {
        if (campaignData.permission === 'Edit') {
          requestData.checklist_permissions.campaigns[campaignData.entityId] = [
            'EDIT',
            'VIEW',
            'DELETE',
            'FILL',
            'FREEZE',
            'UNFREEZE'
          ];
        } else {
          requestData.checklist_permissions.campaigns[campaignData.entityId] = [
            'VIEW',
            'FILL',
            'FREEZE'
          ];
        }
      }
      if (campaignData.data.length) {
        campaignData.data.forEach(checklistData => {
          if (
            checklistData.type === 'checklist' &&
            checklistData.permission !== 'None'
          ) {
            if (checklistData.permission === 'Edit') {
              requestData.checklist_permissions.checklists[
                checklistData.entityId
              ] = ['EDIT', 'VIEW', 'DELETE', 'FILL', 'FREEZE', 'UNFREEZE'];
            } else {
              requestData.checklist_permissions.checklists[
                checklistData.entityId
              ] = ['VIEW', 'FILL', 'FREEZE'];
            }
          }
        });
      }
    });
    console.log(requestData);
    // this.props.postUserPermission(requestData);
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
        icon: (
          <button
            className={
              leafData.permission === 'None'
                ? 'permission-active-button'
                : 'permission-button'
            }
            type="button"
          >
            None
          </button>
        ),
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
        icon: (
          <button
            className={
              leafData.permission === 'Edit'
                ? 'permission-active-button'
                : 'permission-button'
            }
            type="button"
          >
            Edit
          </button>
        ),
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
        icon: (
          <button
            className={
              leafData.permission === 'Fill'
                ? 'permission-active-button'
                : 'permission-button'
            }
            type="button"
          >
            Fill
          </button>
        ),
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
        <Tree
          className={classes.container}
          data={this.state.data}
          labelName="entityName"
          valueName="entityId"
          childrenName="data"
          renderLabel={this.renderTreeLeafLabel}
          getActionsData={this.getTreeLeafActionsData}
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
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    );
  }
}
