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
import * as API from '../API/types';
import Pagination from '../../components/Pagination';

const LeadDecisionPending = () => {

  const [leadType, setLeadType] = useState('Leads');
  let [search, setSearch] = useState('')
  // const [data, setData] = useState([]);

  const LeadDecisionPendingData = async () => {
    let resp = await API.getDecisionPendingList(leadType, search);
    setData(resp.data.data.lead);
  }
  const handleChange = (event) => {
    setLeadType(event.target.value);
    setSearch("");
    LeadDecisionPendingData();
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    LeadDecisionPendingData();
  }
  const data = [{ "_id": "63cf6527b3cf3b2cc60f1bbc", "requirement_id": 10388, "supplier_id": "XESDWMUMKHASECRSYAS", "entity_name": "Yash Garden", "entity_type": "RS", "primary_count": 100, "area": "Khandeshhwar", "city": "Mumbai", "lead_timestamp": "2023-01-24 10:27 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:26 AM", "phone_number": "98********", "rating": 3, "last_comment": "" }, { "_id": "63cf6490b3cf3b2cc60f1bb4", "requirement_id": 10385, "supplier_id": "NDLDWS10RSRAB", "entity_name": "Rashtrapati Bhavan Cabinet Affairs CGHS", "entity_type": "RS", "primary_count": 135, "area": "Dwarka", "city": "Delhi NCR", "lead_timestamp": "2023-01-24 10:24 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:23 AM", "phone_number": "98********", "rating": 3, "last_comment": "" }, { "_id": "63cf6408b3cf3b2cc50f1bb0", "requirement_id": 10382, "supplier_id": "NDLDWS7RSSRA", "entity_name": "SHREE RADHA APARTMENT", "entity_type": "RS", "primary_count": 75, "area": "Dwarka", "city": "Delhi NCR", "lead_timestamp": "2023-01-24 10:22 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:21 AM", "phone_number": "98********", "rating": 3, "last_comment": "" },
   { "_id": "63cf6310b3cf3b2cc50f1ba8", "requirement_id": 10379, "supplier_id": "GZBKPCQRLRSBDR", "entity_name": "Balmukanda Residency", "entity_type": "RS", "primary_count": 250, "area": "Ghaziabad", "city": "Delhi NCR", "lead_timestamp": "2023-01-24 10:18 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:16 AM", "phone_number": "72********", "rating": 3, "last_comment": "" }, 
   { "_id": "63cf5e3ab3cf3b2cc50f1b9e", "requirement_id": 10371, "supplier_id": "ACGDMMUMKAMSECRSPAD", "entity_name": "Padmavati Residency", "entity_type": "RS", "primary_count": 116, "area": "Kamothe", "city": "Mumbai", "lead_timestamp": "2023-01-24 09:57 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 09:57 AM", "phone_number": "97********", "rating": 3, "last_comment": "" },
    { "_id": "63cf5d40b3cf3b2cc30f1b7f", "requirement_id": 10364, "supplier_id": "QMRCCVQCJKNOR", "entity_name": "vidyasagar oswal garden", "entity_type": "RS", "primary_count": 167, "area": "Old Washermanpet", "city": "Chennai", "lead_timestamp": "2023-01-24 09:53 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 09:50 AM", "phone_number": "93********", "rating": 3, "last_comment": "" }, 
    { "_id": "63bc380fb3cf3b1b21ab30cf", "requirement_id": 10118, "supplier_id": "MPVYQUAHRNVOAC", "entity_name": "SEA SHOW CGHS LTD", "entity_type": "RS", "primary_count": 60, "area": "None", "city": "Hyderabad", "lead_timestamp": "2023-01-09 09:21 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-19 10:58 AM", "phone_number": "99********", "rating": 3, "last_comment": "" },
     { "_id": "63b53af1b3cf3b14d027e30c", "requirement_id": 9978, "supplier_id": "ATIHUNOIVAISECRSSUP", "entity_name": "Supertech Estate Complex", "entity_type": "RS", "primary_count": 1, "area": "Vaishali", "city": "Delhi NCR", "lead_timestamp": "2023-01-04 02:08 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-19 10:58 AM", "phone_number": "99********", "rating": 3, "last_comment": "" }, 
     { "_id": "63a967cbb3cf3b3abc1bdaed", "requirement_id": 9866, "supplier_id": "GVUNHFJUERSTW", "entity_name": "Spectrum Bliss", "entity_type": "RS", "primary_count": 16, "area": null, "city": "Kolkata", "lead_timestamp": "2022-12-26 02:52 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-27 11:10 AM", "phone_number": "93********", "rating": 3, "last_comment": "" },
      { "_id": "639ed9b5b3cf3b021105a9c3", "requirement_id": 9663, "supplier_id": "GCBLPDLCHTB", "entity_name": null, "entity_type": "RS", "primary_count": null, "area": "Panchkula", "city": "Chandigarh", "lead_timestamp": "2022-12-18 02:43 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-19 09:52 AM", "phone_number": "73********", "rating": 0, "last_comment": "" }, 
      { "_id": "639b0cecb3cf3b14a40984b9", "requirement_id": 9623, "supplier_id": "JFUDLDJLPCZBE", "entity_name": "Ekta test society", "entity_type": "RS", "primary_count": null, "area": "Delhi", "city": "Delhi NCR", "lead_timestamp": "2022-12-15 05:32 PM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 05:32 PM", "phone_number": "87********", "rating": 3, "last_comment": "" }, 
      { "_id": "6392e909b3cf3b6ebb7560d1", "requirement_id": 9454, "supplier_id": "GZBKPCFAPRSGGR", "entity_name": "Gaur Ganga 2", "entity_type": "RS", "primary_count": 112, "area": "Ghaziabad", "city": "Delhi NCR", "lead_timestamp": "2022-12-09 01:21 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:45 PM", "phone_number": "96********", "rating": 3, "last_comment": "" }, 
      { "_id": "63904ab5b3cf3b2b568b8600", "requirement_id": 9423, "supplier_id": "ZPFUVBENKAS12TRSPOE", "entity_name": "Poetree", "entity_type": "RS", "primary_count": 1, "area": "Kasavanahalli", "city": "Bengaluru", "lead_timestamp": "2022-12-07 01:41 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-07 02:11 PM", "phone_number": "99********", "rating": 3, "last_comment": "" },
       { "_id": "638f00dbb3cf3b2b568b85e3", "requirement_id": 9407, "supplier_id": "QJBPTVISMARVUDRSVAI", "entity_name": "Vaibhav Hills", "entity_type": "RS", "primary_count": 1, "area": "Marripalem", "city": "Vishakhapatnam", "lead_timestamp": "2022-12-06 02:14 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "94********", "rating": 3, "last_comment": "" }, 
       { "_id": "638eff0bb3cf3b2b558b859c", "requirement_id": 9405, "supplier_id": "SUMWGMUMVIRYKRSRAS", "entity_name": "Rashmi Nagar", "entity_type": "RS", "primary_count": 288, "area": "Virar West", "city": "Mumbai", "lead_timestamp": "2022-12-06 02:06 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "638efe65b3cf3b2b548b8585", "requirement_id": 9403, "supplier_id": "ZWMVTMUMVIRBOLRSSUD", "entity_name": "Sudha Palms", "entity_type": "RS", "primary_count": 62, "area": "Virar West", "city": "Mumbai", "lead_timestamp": "2022-12-06 02:03 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "638efdf4b3cf3b2b568b85d9", "requirement_id": 9400, "supplier_id": "YLCWVMICZXPPP", "entity_name": "royal green", "entity_type": "RS", "primary_count": 88, "area": "Lake Town", "city": "Kolkata", "lead_timestamp": "2022-12-06 02:01 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "96********", "rating": 3, "last_comment": "" }, 
       { "_id": "636f2ff5b3cf3b3861154d4f", "requirement_id": 8437, "supplier_id": "KIBCBTUGSWGP", "entity_name": "Wardhmaan Township", "entity_type": "RS", "primary_count": 54, "area": "Wakad", "city": "Pune", "lead_timestamp": "2022-11-12 11:02 AM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-05 08:43 AM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "63663bd1b3cf3b79fe6bf1a7", "requirement_id": 8211, "supplier_id": "FGBBCMUMMUMKAURSNAU", "entity_name": "Nausheen Plaza", "entity_type": "RS", "primary_count": 56, "area": "Mumbra", "city": "Mumbai", "lead_timestamp": "2022-11-05 04:02 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "63586fd5b3cf3b771ab25f30", "requirement_id": 7993, "supplier_id": "CHAZPDHRSSGV", "entity_name": "Sushma Green Vista", "entity_type": "RS", "primary_count": 176, "area": "Zirakpur", "city": "Chandigarh", "lead_timestamp": "2022-10-26 04:53 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-10-26 04:53 AM", "phone_number": "93********", "rating": 0, "last_comment": "" }]

  useEffect(() => {
    // LeadDecisionPendingData();
  }, []);
  const handlePageChange = (page) => {
    alert(page.selected + 1);
  };
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
          <TextField id="input-with-sx" label="Search" variant="standard" value={search} onChange={(e) => handleSearch(e)} />
        </Box>
      </Box>
      <BasicTable data={data} />
      {/* <div className="list__footer">
        <Pagination pageSize={5} totalItems={data.length} handlePageClick={handlePageChange} />
      </div> */}
    </>
  );
};

export default LeadDecisionPending;
