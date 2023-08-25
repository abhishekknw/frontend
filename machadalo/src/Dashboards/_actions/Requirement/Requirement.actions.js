import { useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { SectorListByNumberAtom, LeadsBySectorAtom } from '../../_states';
const RequirementActions = () => {

      const fetchWrapper = useFetchWrapper();
      const alertActions = useAlertActions();
      const setSectorListByNumber = useSetRecoilState(SectorListByNumberAtom)
      const setLeadsBySector = useSetRecoilState(LeadsBySectorAtom)

      const getSectorByNumber = () => {
            return fetchWrapper.get(`${Apis.Get_Sector_List}?mobile_number=8082356021`).then((res) => {
                  if (res?.status) {
                        let newList = res?.data?.sectors.map(item => ({ ...item, label: item?.business_type, value: item?.id }));
                        setSectorListByNumber({ sectors: newList, total_leads: res?.data?.total_leads })
                  }
                  else {
                        alertActions.error(Labels.Error)
                  }
            });
      }

      const getLeadsBySector = (data) => {
            return fetchWrapper.get(`${Apis.Get_Leads_By_Sector}?mobile_number=8082356021&sector_id=${data?.id}`).then((res) => {
                  if (res?.status) {
                        setLeadsBySector(res?.data)
                  }
                  else {
                        alertActions.error(Labels.Error)
                  }
            });
      }

      return {
            getSectorByNumber,
            getLeadsBySector
      }
}

export { RequirementActions };