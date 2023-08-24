import { useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { SectorListByNumberAtom } from '../../_states';

const RequirementActions = () => {

      const fetchWrapper = useFetchWrapper();
      const alertActions = useAlertActions();
      const setSectorListByNumber = useSetRecoilState(SectorListByNumberAtom)

      const getSectorByNumber = () => {
            return fetchWrapper.get(`${Apis.Get_Sector_List}?mobile_number=8082356021`).then((res) => {
                  if (res?.status) {
                        let newList = res?.data?.sectors.map(item => ({ ...item, label: item?.business_type, value: item?.id }));
                        setSectorListByNumber({ sectors: newList, total_leads: res?.data?.total_leads })
                  }
                  else {
                        alertActions.error(Labels.error)
                  }
            });
      }

      return {
            getSectorByNumber,
      }
}

export { RequirementActions };