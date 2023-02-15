import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import BasicTable from './BasicTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { decisionPendingActions } from '../API/_actions';

const LeadDecisionPending = () => {
  const [params, setParams] = useState({
    leadType: 'Leads',
    supplierType: 'all',
    search: '',
    page: 0,
    userType: '',
  });
  const LeadBasicApi = decisionPendingActions();

  const LeadDecisionPendingData = async (data) => {
    await LeadBasicApi.LeadDecisionPendingList(data);
  };

  const handleChange = (e) => {
    let data = params;
    data.leadType = e.target.value;
    setParams({ ...params, leadType: e.target.value });
    LeadDecisionPendingData(data);
  };

  const ChangeSupplierType = (e) => {
    let data = params;
    data.supplierType = e.target.value;
    setParams({ ...params, supplierType: e.target.value });
    LeadDecisionPendingData(data);
  };

  const handleSearch = (e) => {
    let data = params;
    data.search = e.target.value;
    setParams({ ...params, search: e.target.value });
    LeadDecisionPendingData(data);
  };

  const clientStatusList = () => {
    LeadBasicApi.ClientStatusList();
  };

  useEffect(() => {
    let data = params;
    LeadDecisionPendingData(data);
    clientStatusList();
  }, []);

  return (
    <>
      <Box sx={{ minWidth: 120 }} className="b2b-container">
        <Box>
          <FormControl sx={{ mt:1, mb: 1, ms: 0, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">Lead Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.leadType}
              label="Lead Type"
              onChange={handleChange}
            >
              <MenuItem value={'Leads'}>Leads</MenuItem>
              <MenuItem value={'Survey'}>Survey</MenuItem>
              <MenuItem value={'Survey Leads'}>Survey Leads</MenuItem>
              <MenuItem value={'FeedBack'}>FeedBack</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">All</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.supplierType}
              label="Lead Type"
              onChange={ChangeSupplierType}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'RS'}>Residential Society</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt:1, mb: 1, ms: 0, display: 'flex', alignItems: 'flex-end' }} className="input-col">
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search"
            variant="standard"
            value={params.search}
            className="input-col-text"
            onChange={(e) => handleSearch(e)}
          />
        </Box>
      </Box>
      <BasicTable />
    </>
  );
};

export default LeadDecisionPending;
