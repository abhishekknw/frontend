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
    search: '',
    page: 0,
    userType: '',
  });
  const leadDetailApi = LeadDetailActions();

  const CampaignList = async () => {
    await leadDetailApi.CurrentCampaignList(
      '?lead_type=Leads&user_type=undefined&tabname=undefined&supplier_code=all'
    );
  };
  const handleChange = (event) => {
    setLeadType(event.target.value);
  };

  useEffect(() => {
    CampaignList();
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
      </Box>
      <LeadDetailTable data={params} />
    </>
  );
};

export default LeadDetail;
