import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const filterOptions = [
  {
    key: 'All',
    text: 'All',
    value: 'All',
    label: { color: 'black', empty: true, circular: true },
  },
  {
    key: 'Completed',
    text: 'Completed',
    value: 'Completed',
    label: { color: 'blue', empty: true, circular: true },
  },
  {
    key: 'Ongoing',
    text: 'Ongoing',
    value: 'Ongoing',
    label: { color: 'green', empty: true, circular: true },
  },
  {
    key: 'On Hold',
    text: 'On Hold',
    value: 'On Hold',
    label: { color: 'yellow', empty: true, circular: true },
  },
  {
    key: 'Rejected',
    text: 'Rejected',
    value: 'Rejected',
    label: { color: 'red', empty: true, circular: true },
  },
];

const DropdownFilterSearchInMenu = (props) => (
  <span>
    Campaign Status :{' '}
    <Dropdown
      inline
      options={filterOptions}
      onChange={props.onClick}
      defaultValue={filterOptions[0].value}
    />
  </span>
);

export default DropdownFilterSearchInMenu;
