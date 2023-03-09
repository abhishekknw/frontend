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
} from '@mui/material';
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

export default function CreateNewTemplate(props) {
  const [open, setOpen] = React.useState(false);
  const leadDetailApi = LeadDetailActions();
  const [TemplateData, setTemplateData] = useRecoilState(TemplateDataList);

  const getTemplateList = async () => {
    await leadDetailApi.getTemplateList(props?.data?.id);
    setOpen(true);
  };

  function getFieldName(name, edit) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={name}
            className="select-menu"
            // onChange={handleChange}
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
  }
  function getTemplateType(type, edit) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            disabled={!edit}
            value={type}
            className="select-menu"
            // onChange={handleChange}
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
            // onChange={handleChange}
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
          onChange={(e) => setComment(e.target.value)}
        />
      </>
    );
  }
  function getButtons(button) {
    return (
      <>
        {/* {button.map((data,index) => { */}
        <Button>{button[0].name}</Button>
        <br />
        <Button>{button[1].name}</Button>
        <br />
        <Button>{button[2].name}</Button>

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
          onChange={(e) => setComment(e.target.value)}
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
          onChange={(e) => setComment(e.target.value)}
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
          onChange={(e) => setComment(e.target.value)}
        />
      </>
    );
  }

  function rowEditAndUpdate(id) {
    let newList = [...TemplateData.rows].map((item, index) => {
      if (id === item.md_id) return { ...item, isEditing: true };
      else return { ...item, isEditing: false };
    });
    setTemplateData({ ...TemplateData, rows: newList });
  }
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
            <Box>
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
                          <TableCell>{column.headerName}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {TemplateData &&
                        TemplateData.rows &&
                        TemplateData.rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{getFieldName(row.field_name, row?.isEditing)}</TableCell>
                            <TableCell>{getAliasName(row.alias_name, row?.isEditing)}</TableCell>
                            <TableCell>
                              {getTemplateType(row.g_templateType, row?.isEditing)}
                            </TableCell>
                            <TableCell>{getComment(row.comment, row?.isEditing)}</TableCell>
                            <TableCell>{sendTrigger(row.send_trigger, row?.isEditing)}</TableCell>
                            <TableCell>{getTriggerMessage(row.data, row?.isEditing)}</TableCell>
                            <TableCell>{getParams(row.param, row?.isEditing)}</TableCell>
                            <TableCell>{getButtons(row.button, row?.isEditing)}</TableCell>
                            <TableCell>
                              <Button>
                                <EditIcon
                                  onClick={(e) => {
                                    rowEditAndUpdate(row.md_id);
                                  }}
                                />
                              </Button>
                              <Button>
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
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
