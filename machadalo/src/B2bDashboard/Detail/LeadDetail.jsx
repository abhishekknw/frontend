import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LeadDetailTable from '../Table/LeadDetailTable';

const LeadDetail = () => {
  const [leadType, setLeadType] = React.useState('Leads');

  const handleChange = (event) => {
    setLeadType(event.target.value);
  };
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Lead Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={leadType}
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
      <LeadDetailTable leadType={leadType} />
    </>
  );
};

export default LeadDetail;
