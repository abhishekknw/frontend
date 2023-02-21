import * as React from 'react';
import dayjs from 'dayjs';
import { Typography, Box } from '@mui/material';
import CampaignTable from './CamapignTable';
import { NewLeadsTabActions } from '../../API/_actions';
import { LeadCount } from '../../API/_state';
import NewLeadTabFilterModal from '../../modals/NewLeadTabFilterModal';
import { leadCampaignData } from '../../API/_state';
import { useRecoilValue } from 'recoil';

export default function NewLeadsBasic() {
  const NewLeadTabApi = NewLeadsTabActions();
  const countLead = useRecoilValue(LeadCount);
  const tableData = useRecoilValue(leadCampaignData);
  const [searchDate, setSearchDate] = React.useState(dayjs('2023-03-15T21:11:54'));

  const getCampaignData = async (e) => {
    let data = { selectDate: '2023-02-06 00:00:00.0000' };
    await NewLeadTabApi.getLeadCampaignData(data);
    setSearchDate(dayjs(e?.$d).format('YYYY-MM-DD'));
  };

  return (
    <>
      <Box className="d-flex pt-4 date-box justify-content-around">
        <Box className="d-flex">
          <Box className="time-color-bg text-center mx-5">
            <Typography variant="h6" className="text-white pb-1 count-heading">
              Least Count
            </Typography>
            <Typography
              variant="h2"
              className="count"
              onClick={(e) => {
                getCampaignData(e);
              }}
            >
              {countLead?.lead_count ? countLead?.lead_count : 0}
            </Typography>
          </Box>
          <Box className="time-color-bg text-center mx-5">
            <Typography variant="h6" className="text-white pb-1 count-heading">
              Satisfaction Survey
            </Typography>
            <Typography variant="h2" className="count">
              {countLead?.existing_client_count ? countLead?.existing_client_count : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <NewLeadTabFilterModal />
      {tableData?.campaigns?.length > 0 && <CampaignTable />}
    </>
  );
}

// date: 2023-02-06 00:00:00.0000
