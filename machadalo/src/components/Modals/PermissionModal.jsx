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
    paddingTop: '5px'
  }
};

const classes = {
  container: 'tree-modal',
  icon: 'tree-icon',
  leaf: 'TreeDemo-leaf-179'
};

const thisData = {
  entityName: 'All Campaign',
  type: 'campaign',
  entityId: '564adjygy675765adfg',
  data: [
    {
      entityName: "BYJU's South Delhi",
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygsdy675765adfg'
    },
    {
      entityName: 'Urban Ladder Bangalore Live',
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy6sd75765adfg'
    },
    {
      entityName: "BYJU's Mumbai - Borivali to Virar",
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy675we765adfg'
    },
    {
      entityName: 'testcoim',
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy67576a5adfg'
    },
    {
      entityName: 'Test Vyoma',
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy67as5765adfg'
    },
    {
      entityName: "BYJU's Kanpu",
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy6757qq65adfg'
    },
    {
      entityName: "BYJU's Lucknow",
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy675765wwadfg'
    },
    {
      entityName: "BYJU'S Chandigarh",
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy675765adeefg',
      data: [
        {
          entityName: 'CL 1',
          type: 'blob',
          permission: 'None',
          entityId: '564adjygy675765rradfg'
        },
        {
          entityName: 'CL 2',
          type: 'blob',
          permission: 'None',
          entityId: '564adjygy675765adttfg'
        },
        {
          entityName: 'CL 3',
          type: 'blob',
          permission: 'None',
          entityId: '564adjygy675765adfgyy'
        }
      ]
    },
    {
      entityName: 'GA test 1',
      type: 'campaign',
      permission: 'None',
      entityId: '564adjygy675765adfgwu'
    }
  ]
};

export default class PermissionModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: {
        entityName: 'All Campaign',
        type: 'campaign',
        entityId: 'all',
        data: []
      }
    };
  }

  componentWillMount() {
    console.log(this.props);
    this.props.getUserPermission();
  }

  componentDidUpdate() {
    if (
      (!this.state.data.data.length &&
        this.props.settings.userPermission.length) ||
      (this.state.data.data.length &&
        this.props.settings.userPermission.length &&
        this.state.data.data[0].entityId !=
          this.props.settings.userPermission[0].entityId)
    ) {
      let dataInfo = this.state.data;
      dataInfo.data = this.props.settings.userPermission;
      this.setState({
        data: dataInfo
      });
    }
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
            });
          }
          this.setState({ data });
        }
      }
    ];
  };

  render() {
    return (
      <Modal isOpen={true} style={customStyles} ariaHideApp={false}>
        <Tree
          className={classes.container}
          title="User Permission"
          data={this.state.data}
          labelName="entityName"
          valueName="entityId"
          childrenName="data"
          renderLabel={this.renderTreeLeafLabel}
          getActionsData={this.getTreeLeafActionsData}
        />
      </Modal>
    );
  }
}
