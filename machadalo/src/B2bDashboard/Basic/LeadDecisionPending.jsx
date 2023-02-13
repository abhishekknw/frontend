import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import BasicTable from '../Table/BasicTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilValue } from 'recoil';
import { leadDecisionPendingListAtom } from '../API/_state';
import { decisionPendingActions } from '../API/_actions';

const LeadDecisionPending = () => {
  const [leadType, setLeadType] = useState('Leads');
  let [search, setSearch] = useState('');
  const ListData = useRecoilValue(leadDecisionPendingListAtom);
  const LeadBasicApi = decisionPendingActions();

  const LeadDecisionPendingData = async () => {
    await LeadBasicApi.LeadDecisionPendingList(
      '?type_of_entity=all&next_page=0&user_type=undefined&search='
    );
  };

  const handleChange = (event) => {
    setLeadType(event.target.value);
    setSearch('');
    LeadDecisionPendingData();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    LeadDecisionPendingData();
  };

  useEffect(() => {
    LeadDecisionPendingData();
  }, []);

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
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

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search"
            variant="standard"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </Box>
      </Box>
      <BasicTable data={ListData} />
    </>
  );
};

export default LeadDecisionPending;
