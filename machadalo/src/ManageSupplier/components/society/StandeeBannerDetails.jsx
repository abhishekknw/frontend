import { useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function StandeeBannerDetails() {
  const fetchWrapper = useFetchWrapper();
  const [standee, setStandee] = useState();

  const getStandee = () => {
    fetchWrapper.get(ANG_APIS.GET_STANDEES_BANNER).then((res) => {
      setStandee(res.data);
    });
  };

  useEffect(() => {
    getStandee();
  }, []);

  return (
    <>
      <div>
        <h2 className="heading">Standee Details</h2>
        <table className="table-data">
          <tr>
            <th>AdInventory ID</th>
            <th>Tower Name</th>
            <th>Release Location</th>
            <th>Inventory Status</th>
          </tr>
          <tr ng-repeat="standee in model.standee_details">
            <td>
              <span>{standee?.adinventory_id}</span>
            </td>
            <td>
              <span>{standee?.tower_name}</span>
            </td>
            <td>
              <input type="text" className="field" ng-model="standee?.standee_location" />
            </td>
            <td>
              <select className="field" ng-model="standee?.inventory_status">
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </td>
          </tr>
        </table>
        <input type="button" className="smallBtn" ng-click="onSubmit()" value="Update" />
      </div>
    </>
  );
}
