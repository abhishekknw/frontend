import { useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useEffect } from 'react';

export default function Fliers() {
  const fetchWrapper = useFetchWrapper();
  const [flier, setFlier] = useState();
  const [model, setModel] = useState();

  const getFlyer = () => {
    fetchWrapper.get(ANG_APIS.GET_FLIER).then((res) => {
      setFlier(res.data);
    });
  };

  useEffect(() => {
    getFlyer();
  }, []);

  return (
    <div>
      <h2 className="heading">Flyer Details</h2>
      <table className="table-data">
        <tr>
          <th>Ad Inventory Id</th>
          <th>Flat Count</th>
          <th>Mode of Campaign</th>
          <th>Action</th>
        </tr>
        <tr ng-repeat="flier in model?.flyers_data">
          <td>
            <span>{flier?.adinventory_id}</span>
          </td>
          <td>
            <span>{model?.flat_count}</span>
          </td>
          <td>
            <label className="checkbox">
              MailBox
              <input type="checkbox" ng-model="flier?.mailbox_allowed" ng-click="" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox">
              DoorToDoor
              <input type="checkbox" ng-model="flier?.d2d_allowed" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox">
              Lobby
              <input type="checkbox" ng-model="flier?.lobbytolobby_allowed" />
              <span className="checkmark"></span>
            </label>
          </td>
          <td>
            <input
              type="button"
              className="delete-button smallBtn"
              ng-click="deleteFlyer(flier?.id)"
              value="Delete"
            />
          </td>
        </tr>
      </table>
      <input type="button" className="smallBtn" ng-click="onSubmit()" value="Save Flyer Details" />
    </div>
  );
}
