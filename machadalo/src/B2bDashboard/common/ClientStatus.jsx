import * as React from 'react';
import { MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import { clientStatusAtom } from '../API/_state';
import { useRecoilValue } from 'recoil';

export default function ClientStatusDropdown(props) {
  const clientStatus = useRecoilValue(clientStatusAtom);
  const ChangeClientStatus = (e, value) => {
    alert(value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <Select
        className="select-menu"
          value={props.data.row.macchadalo_client_status}
          onChange={ChangeClientStatus}
          displayEmpty inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
          {clientStatus.map((status, index) => (
            <MenuItem key={index} value={status.status_name} 
            className="select-menu-list">
              {status.status_name}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
    </>
  );
}
