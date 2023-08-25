import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function PosterDetails() {
  const fetchWrapper = useFetchWrapper();
  const [lift, setLift] = useState();
  const [nb, setNb] = useState();
  const [poster, setPoster] = useState();

  const getPoster = () => {
    fetchWrapper.get(ANG_APIS.GET_POSTER).then((res) => {
      setPoster(res.data);
    });
  };

  useEffect(() => {
    getPoster();
  }, []);
  return (
    <>
      <div className="posterdetail">
        <h2 className="heading">Lift Details</h2>
        <table className="table-data">
          <thead>
            <tr>
              <th>Lift ID</th>
              <th>Tower Name</th>
              <th>Poster Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="lift in model.lift_details">
              <td>
                <span>{lift?.lift_tag}</span>
              </td>
              <td>
                <span>{lift?.tower_name}</span>
              </td>
              <td>
                <input type="text" className="field" ng-model="lift?.lift_location" />
              </td>
              <td>
                <input
                  type="button"
                  className="smallBtn"
                  ng-click="deletePoster(lift?.id, 'lift')"
                  value="Delete"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="button" className="smallBtn" ng-click="onSubmit()" value="Update" />
      </div>
      <div className="posterdetail">
        <h2 className="heading">Notice Board Details</h2>
        <table className="table-data">
          <tr>
            <th>Inventory ID</th>
            <th>Tower Name</th>
            <th>Poster Count</th>
            <th>Type</th>
            <th>Length</th>
            <th>Breadth</th>
            <th>Action</th>
          </tr>
          <tr ng-repeat="nb in model.nb_details">
            <td>
              <span>{nb?.notice_board_tag}</span>
            </td>
            <td>
              <span>{nb?.tower_name}</span>
            </td>
            <td>
              <input
                type="integer"
                className="field"
                ng-model="nb?.total_poster_per_notice_board"
              />
            </td>
            <td>
              <select className="field" ng-model="nb?.notice_board_type">
                <option>Pin Insertion Type</option>
                <option>Pasting Type</option>
              </select>
            </td>
            <td>
              <input type="integer" className="field" ng-model="nb?.notice_board_size_length" />
            </td>
            <td>
              <input type="integer" className="field" ng-model="nb?.notice_board_size_breadth" />
            </td>
            <td>
              <input
                type="button"
                className="smallBtn"
                ng-click="deletePoster(nb?.id, 'notice')"
                value="Delete"
              />
            </td>
          </tr>
        </table>
        <input type="button" className="smallBtn" ng-click="onSubmit()" value="Update" />
      </div>
      <div className="posterdetail">
        <h2 className="heading">Poster Details</h2>
        <table className="table-data">
          <tr>
            <th>AdInventory ID</th>
            <th>Inventory ID</th>
            <th>Tower Name</th>
          </tr>
          <tr ng-repeat="poster in model.poster_details">
            <td>
              <span>{poster?.adinventory_id}</span>
            </td>
            <td>
              <span>{poster?.poster_location}</span>
            </td>
            <td>
              <span>{poster?.tower_name}</span>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
