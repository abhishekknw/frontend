import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LeadDetailTable from './detailCampaignTable';
import { LeadDetailActions } from '../API/_actions';
import { viewLeadFilters } from '../API/_state';
import { useRecoilState } from 'recoil';

const LeadDetail = () => {
  // const [params, setParams] = useState({
  //   leadType: 'Leads',
  //   supplierType: 'all',
  //   tabname: '',
  //   userType: '',
  // });
  const [filters, setFilters] = useRecoilState(viewLeadFilters);
  const leadDetailApi = LeadDetailActions();

  const CampaignList = async (data) => {
    await leadDetailApi.CurrentCampaignList(data);
  };

  const handleChange = (event) => {
    let data = filters;
    data = { data, lead_type: event.target.value };
    setFilters({ ...filters, lead_type: event.target.value });
    CampaignList(data);
  };

  const ChangeSupplier = (event) => {
    let data = filters;
    data = { data, supplier_type: event.target.value };
    setFilters({ ...filters, supplier_type: event.target.value });
    CampaignList(data);
  };

  useEffect(() => {
    let data = filters;
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
            value={filters.lead_type}
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
            value={filters.supplier_type}
            label="Lead Type"
            onChange={ChangeSupplier}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'RS'}>Residential Society</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <LeadDetailTable />
    </>
  );
};

export default LeadDetail;
