import * as React from 'react';
import dayjs from 'dayjs';
import { Typography, Box } from '@mui/material';
import CampaignTable from './CamapignTable';
import { NewLeadsTabActions } from '../../API/_actions';
import NewLeadTabFilterModal from '../../modals/NewLeadTabFilterModal';
import { leadCampaignData, selectedDate, LeadCount } from '../../API/_state';
import { useRecoilValue } from 'recoil';

export default function NewLeadsBasic() {
  const NewLeadTabApi = NewLeadsTabActions();
  const countLead = useRecoilValue(LeadCount);
  const tableData = useRecoilValue(leadCampaignData);
  const Date = useRecoilValue(selectedDate);

  const getCampaignData = async (e) => {
    let data = { selectDate: Date.selectDate };
    await NewLeadTabApi.getLeadCampaignData(data);
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
