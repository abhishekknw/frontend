import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LeadDetailTable from '../Table/LeadDetailTable';
import { LeadDetailActions } from '../API/_actions';

const LeadDetail = () => {
  const [params, setParams] = useState({
    leadType: 'Leads',
    supplierType: 'all',
    tabname: '',
    userType: '',
  });
  const leadDetailApi = LeadDetailActions();

  const CampaignList = async (data) => {
    await leadDetailApi.CurrentCampaignList(data);
  };

  const handleChange = (event) => {
    let data = params;
    data.leadType = event.target.value;
    setParams({ ...params, leadType: event.target.value });
    CampaignList(data);
  };

  const ChangeSupplier = (event) => {
    let data = params;
    data.supplierType = event.target.value;
    setParams({ ...params, supplierType: event.target.value });
    CampaignList(data);
  };

  useEffect(() => {
    let data = params;
    CampaignList(data);
  }, []);
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Lead Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={params.supplierType}
            label="Lead Type"
            onChange={ChangeSupplier}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'RS'}>Residential Society</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <LeadDetailTable data={params} />
    </>
  );
};

export default LeadDetail;
