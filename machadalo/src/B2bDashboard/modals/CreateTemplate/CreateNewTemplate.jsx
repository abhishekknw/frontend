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
  Popper, Grow
} from '@mui/material';
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
import SettingsIcon from '@mui/icons-material/Settings';


export default function CreateNewTemplate(props) {
  const [open, setOpen] = React.useState(false);
  const leadDetailApi = LeadDetailActions();
  const [TemplateData, setTemplateData] = useRecoilState(TemplateDataList);
  const [EditRow, setEditRow] = React.useState({});
  const [rowId, setrowId] = React.useState();

  const getTemplateList = async () => {
    await leadDetailApi.getTemplateList(props?.data?.id);
    setOpen(true);
  };
  
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  function setEditRowData(key, value) {
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

  const getFieldName = (name, edit) => {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={name}
            className="select-menu"
            onChange={(e) => setEditRowData('field_name', e.target.value)}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 1 }}
          >
            {TemplateData.field_list.map((field, index) => (
              <MenuItem key={index} value={field.name} className="select-menu-list">
                {field.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  };
  function getTemplateType(type, edit) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={type}
            className="select-menu"
            onChange={(e) => setEditRowData('g_templateType', e.target.value)}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 1 }}
          >
            {TemplateData.template_type.map((type, index) => (
              <MenuItem key={index} value={type} className="select-menu-list">
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }

  function sendTrigger(trigger, edit) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={trigger}
            className="select-menu"
            onChange={(e) => setEditRowData('send_trigger', e.target.value)}
            size="small"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 1 }}
          >
            <MenuItem key={1} value={'YES'} className="select-menu-list">
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
  function getParams(data, edit) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={data.toString()}
          onChange={(e) => setEditRowData('param', e.target.value.split(','))}
        />
      </>
    );
  }
  function getButtons(button) {
    return (
      <>
      
      <div className='button-modal-popup'>
          <Button
            color="inherit"
            ref={anchorRef}
            id="composition-button-modal"
            aria-controls={open ? 'composition-menu-modal' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
           
            onClick={handleToggle}
          >
            <SettingsIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu-modal"
                      aria-labelledby="composition-button-modal"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                      <Button className='theme-btn text-white mb-2'>{button[0].name}</Button>
                      </MenuItem>
                      <MenuItem>
                       <Button className='theme-btn text-white mb-2'>{button[1].name}</Button>
                      </MenuItem>
                      <MenuItem>
                      <Button className='theme-btn text-white'>{button[2].name}</Button>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        {/* {button.map((data,index) => { */}
        {/* <Button className='theme-btn text-white mb-2'>{button[0].name}</Button>
        <br />
        <Button className='theme-btn text-white mb-2'>{button[1].name}</Button>
        <br />
        <Button className='theme-btn text-white'>{button[2].name}</Button> */}

        {/* })} */}
      </>
    );
  }

  function getAliasName(name, edit) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={name}
          onChange={(e) => setEditRowData('alias_name', e.target.value)}
        />
      </>
    );
  }

  function getComment(comment, edit) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={comment}
          onChange={(e) => setEditRowData('comment', e.target.value)}
        />
      </>
    );
  }
  function getTriggerMessage(message, edit) {
    return (
      <>
        <TextField
          sx={{ width: 100 }}
          disabled={!edit}
          className="textarea-modal"
          placeholder="Write Here"
          multiline
          value={message}
          onChange={(e) => setEditRowData('data', e.target.value)}
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
          setEditRow({ ...item });
          return { ...item, isEditing: false };
        } else return { ...item, isEditing: false };
      });
      updateTemplate();
      setTemplateData({ ...TemplateData, rows: newList });
    }
  };

  const updateTemplate = async () => {
    await leadDetailApi.UpdateTemplate(EditRow);
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
          {/* <div style={{ height: 300, width: '100%' }}>
            <DataGrid 
            editMode="row" 
            rows={TemplateData.rows} 
            columns={TemplateHeader} 
            getRowId={(row, index) =>
              row.md_id}
              />
          </div> */}
          <Box className="d-flex justify-content-around upload-btns">
            {/* <Typography className=" pb-3 text-black text-center red-font" variant="h6">
                Create and Edit Leads
              </Typography> */}

            <Paper
              sx={{ width: '90%', overflow: 'hidden', maxWidth: '1100px' }}
              className="createfieldb2b "
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TemplateHeader.map((column) => (
                        <TableCell className='createHeader'>{column.headerName}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TemplateData &&
                      TemplateData.rows &&
                      TemplateData.rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className='createCell'>{getFieldName(row.field_name, row?.isEditing)}</TableCell>
                          <TableCell className='createCell'>{getAliasName(row.alias_name, row?.isEditing)}</TableCell>
                          <TableCell className='createCell'>
                            {getTemplateType(row.g_templateType, row?.isEditing)}
                          </TableCell>
                          <TableCell className='createCell'>{getComment(row.comment, row?.isEditing)}</TableCell>
                          <TableCell className='createCell'>{sendTrigger(row.send_trigger, row?.isEditing)}</TableCell>
                          <TableCell className='createCell'>{getTriggerMessage(row.data, row?.isEditing)}</TableCell>
                          <TableCell className='createCell'>{getParams(row.param, row?.isEditing)}</TableCell>
                          <TableCell className='createCell'>{getButtons(row.button, row?.isEditing)}</TableCell>
                          <TableCell className='createCell save-edit-btn-modal'>
                            <Button className='editicon'>
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
                            <Button  className='deleteicon'>
                              <DeleteIcon />
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
    </>
  );
}
