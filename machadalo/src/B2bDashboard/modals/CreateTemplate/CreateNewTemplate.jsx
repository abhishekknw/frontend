import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuList,
  Popper,
  Grow,
} from '@mui/material';
import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { LeadDetailActions } from '../../API/_actions';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TemplateDataList } from '../../API/_state';
import { TemplateHeader } from './getHeader';
import { Select, FormControl, MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddNewTemplate from './AddTemplate';
import SettingsIcon from '@mui/icons-material/Settings';

export default function CreateNewTemplate(props) {
  const [open, setOpen] = React.useState(false);
  const leadDetailApi = LeadDetailActions();
  const [TemplateData, setTemplateData] = useRecoilState(TemplateDataList);
  const [EditRow, setEditRow] = React.useState({});
  const [rowId, setrowId] = React.useState();
  const [newRow, setNewRow] = React.useState({
    campaign_id: props?.data?.id,
    field_name: '',
    alias_name: '',
    data: '',
    comment: '',
    g_templateType: '',
    send_trigger: '',
    param: [],
    button: [],
    buttonOne: '',
    buttonThree: '',
    buttonTwo: '',
    status_id: '',
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCard = Boolean(anchorEl);
  const coardId = openCard ? 'simple-popover' : undefined;
  const [showButton, setShowButton] = React.useState([]);

  const getTemplateList = async () => {
    await leadDetailApi.getTemplateList(props?.data?.id);
    setOpen(true);
  };
  function setEditRowData(key, value, check) {
    if (check === 'NEW') {
      if (key == 'field_name') setNewRow({ ...newRow, field_name: value });
      if (key == 'alias_name') setNewRow({ ...newRow, alias_name: value });
      if (key == 'g_templateType') setNewRow({ ...newRow, g_templateType: value });
      if (key == 'send_trigger') setNewRow({ ...newRow, send_trigger: value });
      if (key == 'comment') setNewRow({ ...newRow, comment: value });
      if (key == 'data') setNewRow({ ...newRow, data: value });
      if (key == 'param') setNewRow({ ...newRow, param: value });
    }
    let newList = [];
    newList = [...TemplateData.rows].map((item, index) => {
      if (rowId === item.md_id) {
        if (key == 'field_name') return { ...item, field_name: value };
        if (key == 'alias_name') return { ...item, alias_name: value };
        if (key == 'g_templateType') return { ...item, g_templateType: value };
        if (key == 'send_trigger') return { ...item, send_trigger: value };
        if (key == 'comment') return { ...item, comment: value };
        if (key == 'data') return { ...item, data: value };
        if (key == 'param') return { ...item, param: value };
      } else return item;
    });
    setTemplateData({ ...TemplateData, rows: newList });
  }

  const getFieldName = (name, edit, check) => {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={name}
            className="select-menu"
            onChange={(e) => setEditRowData('field_name', e.target.value, check)}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 1 }}
          >
            {TemplateData.field_list &&
              TemplateData.field_list.map((field, index) => (
                <MenuItem key={index} value={field.name} className="select-menu-list">
                  {field.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </>
    );
  };
  function getTemplateType(type, edit, check) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={type}
            className="select-menu"
            onChange={(e) => setEditRowData('g_templateType', e.target.value, check)}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 1 }}
          >
            {TemplateData.template_type &&
              TemplateData.template_type.map((type, index) => (
                <MenuItem key={index} value={type} className="select-menu-list">
                  {type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </>
    );
  }

  function sendTrigger(trigger, edit, check) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={trigger}
            className="select-menu"
            onChange={(e) => setEditRowData('send_trigger', e.target.value, check)}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 1 }}
          >
            <MenuItem key={1} value={'yes'} className="select-menu-list">
              {'YES'}
            </MenuItem>
            <MenuItem key={2} value={'no'} className="select-menu-list">
              {'NO'}
            </MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }
  function getParams(data, edit, check) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={data.toString()}
          onChange={(e) => setEditRowData('param', e.target.value.split(','), check)}
        />
      </>
    );
  }

  const getButtons = (button, edit, check) => {
    setShowButton(button);
  };

  function getAliasName(name, edit, check) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={name}
          onChange={(e) => setEditRowData('alias_name', e.target.value, check)}
        />
      </>
    );
  }

  function getComment(comment, edit, check) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={comment}
          onChange={(e) => setEditRowData('comment', e.target.value, check)}
        />
      </>
    );
  }
  function getTriggerMessage(message, edit, check) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={message}
          onChange={(e) => setEditRowData('data', e.target.value, check)}
        />
      </>
    );
  }

  const rowEditAndUpdate = (id, mode) => {
    setrowId(id);
    if (mode === 'EDIT') {
      let newList = [...TemplateData.rows].map((item, index) => {
        if (id === item.md_id) {
          return { ...item, isEditing: true };
        } else {
          return { ...item, isEditing: false };
        }
      });
      setTemplateData({ ...TemplateData, rows: newList });
    } else {
      let newList = [...TemplateData.rows].map((item, index) => {
        if (id === item.md_id) {
          setEditRow({ ...item, isEditing: false });
          return { ...item, isEditing: false };
        } else return { ...item, isEditing: false };
      });
      updateTemplate();
      setTemplateData({ ...TemplateData, rows: newList });
    }
  };

  const updateTemplate = async () => {
    await leadDetailApi.AddUpdateTemplate(EditRow);
  };

  const DeleteTemplate = async (id) => {
    await leadDetailApi.deleteTemplate(id);
  };

  const AddNewRow = async () => {
    console.log(newRow);
    await leadDetailApi.AddUpdateTemplate(newRow);
    setNewRow({
      campaign_id: props?.data?.id,
      field_name: '',
      alias_name: '',
      data: '',
      comment: '',
      g_templateType: '',
      send_trigger: '',
      param: [],
      button: [],
      buttonOne: '',
      buttonThree: '',
      buttonTwo: '',
    });
  };
  return (
    <>
      <Button
        className="theme-btn"
        variant="contained"
        size="small"
        style={{}}
        onClick={(e) => {
          getTemplateList(e);
        }}
      >
        Create
      </Button>
      <Dialog
        width={800}
        className="modal-comment create-table"
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <Button
          className="close-btn"
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Button>
        <DialogTitle className="title-modal">CREATE FIELDS</DialogTitle>
        <DialogContent className="content-modal">
          <Box className="d-flex justify-content-around upload-btns">
            <Paper
              sx={{ width: '90%', overflow: 'hidden', maxWidth: '1100px' }}
              className="createfieldb2b "
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TemplateHeader.map((column) => (
                        <TableCell className="createHeader">{column.headerName}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TemplateData && (
                      <TableRow>
                        <TableCell className="createCell">
                          {getFieldName(newRow.field_name, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {getAliasName(newRow.alias_name, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {getTemplateType(newRow.g_templateType, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {getComment(newRow.comment, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {sendTrigger(newRow.send_trigger, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {getTriggerMessage(newRow.data, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {getParams(newRow.param, true, 'NEW')}
                        </TableCell>
                        <TableCell className="createCell">
                          {/* {getButtons(newRow.button, true, 'NEW')} */}
                          <SettingsIcon
                            aria-describedby={coardId}
                            variant="contained"
                            onClick={(e) => {
                              getButtons(newRow.button, true, 'NEW'), setAnchorEl(e.currentTarget);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            className="theme-btn"
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              AddNewRow(e);
                            }}
                          >
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                    {TemplateData &&
                      TemplateData.rows &&
                      TemplateData.rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="createCell">
                            {getFieldName(row.field_name, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {getAliasName(row.alias_name, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {getTemplateType(row.g_templateType, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {getComment(row.comment, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {sendTrigger(row.send_trigger, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {getTriggerMessage(row.data, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {getParams(row.param, row?.isEditing)}
                          </TableCell>
                          <TableCell className="createCell">
                            {/* {getButtons(row.button, row?.isEditing)} */}
                            <SettingsIcon
                              aria-describedby={coardId}
                              variant="contained"
                              onClick={(e) => {
                                getButtons(row.button, row?.isEditing),
                                  setAnchorEl(e.currentTarget);
                              }}
                            />
                          </TableCell>
                          <TableCell className="createCell">
                            <Button>
                              {row?.isEditing ? (
                                <SaveIcon
                                  onClick={(e) => {
                                    rowEditAndUpdate(row.md_id, 'SAVE');
                                  }}
                                />
                              ) : (
                                <EditIcon
                                  onClick={(e) => {
                                    rowEditAndUpdate(row.md_id, 'EDIT');
                                  }}
                                />
                              )}
                            </Button>
                            <Button>
                              <DeleteIcon
                                onClick={(e) => {
                                  DeleteTemplate(row.md_id);
                                }}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </DialogContent>
      </Dialog>
      <div>
        <Popover
          className="btn-box"
          id={coardId}
          open={openCard}
          anchorEl={anchorEl}
          onClose={(e) => {
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box>
            {' '}
            {/* <span className="button-label">B1</span> */}
            <TextField
              label="Button 1"
              id="outlined-size-small"
              onChange={(e) => setNewRow({ ...newRow, buttonOne: e.target.value })}
              defaultValue={showButton[0]?.name}
              size="small"
            />
          </Box>
          <Box>
            {' '}
            {/* <span className="button-label">B2</span> */}
            <TextField
              label="Button 2"
              id="outlined-size-small"
              onChange={(e) => setNewRow({ ...newRow, buttonTwo: e.target.value })}
              defaultValue={showButton[1]?.name}
              size="small"
            />
          </Box>
          <Box>
            {' '}
            {/* <span className="button-label">B3</span> */}
            <TextField
              label="Button 3"
              id="outlined-size-small"
              onChange={(e) => setNewRow({ ...newRow, buttonThree: e.target.value })}
              defaultValue={showButton[0]?.name}
              size="small"
            />
          </Box>
        </Popover>
      </div>
    </>
  );
}
