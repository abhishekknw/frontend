import * as React from 'react';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';

const renderSelectEditInputCell = (params) => {
  console.log(params);
  return <SelectEditInputCell {...params} />;
};

function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select value={value} onChange={handleChange} size="small" sx={{ height: 1 }} native autoFocus>
      <option>Back-end Developer</option>
      <option>Front-end Developer</option>
      <option>UX Designer</option>
    </Select>
  );
}

SelectEditInputCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.any,
};

export const TemplateHeader = [
  {
    field: 'field_name',
    headerName: 'Field Name',
    width: 180,
    editable: true,
    type: '',
    // renderEditCell: renderSelectEditInputCell
  },
  { field: 'alias_name', headerName: 'Alais Name', type: 'number', editable: true },
  {
    field: 'g_templateType',
    headerName: 'Type of Field',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'send_trigger',
    headerName: 'Send Trigger (Y/N)',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'data',
    headerName: 'Trigger Message',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'param',
    headerName: 'Params',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'button',
    headerName: 'Buttons',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Action',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];
