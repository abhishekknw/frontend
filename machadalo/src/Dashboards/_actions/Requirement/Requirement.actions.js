import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';

const RequirementActions = () => {

      const fetchWrapper = useFetchWrapper();
      const alertActions = useAlertActions();

      const getSectorByNumber = () => {
            return fetchWrapper.get(`${Apis.Get_Sector_List}?mobile_number=8082356021`).then((res) => {
                  console.log(res)
            });
      }

      return {
            getSectorByNumber,
      }
}

export { RequirementActions };