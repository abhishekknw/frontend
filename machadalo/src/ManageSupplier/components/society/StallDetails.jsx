import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function StallDetails() {
  const fetchWrapper = useFetchWrapper();
  const [stall, setStall] = useState();

  const getStall = () => {
    fetchWrapper.get(ANG_APIS.GET_STALLS).then((res) => {
      setStall(res.data);
    });
  };

  useEffect(() => {
    getStall();
  }, []);

  return (
    <div>
      <h2 className="heading">General Details of Stalls/Car Display</h2>
      <div className="tabContentBox">
        <div className="contentBox">
          <div className="item">
            <label>Stall Timing</label>
            <select className="field" ng-model="model.stall_timing">
              <option>Morning</option>
              <option>Evening</option>
              <option>Both</option>
            </select>
          </div>
          <div className="item">
            <label>Stall on Weekdays Allowed</label>
            <select className="field" ng-model="model.stall_weekdays">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="item">
            <label>Sound System Available</label>
            <select className="field" ng-model="model.sound_system_allowed">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="item">
            <label>Electricity Available</label>
            <select className="field" ng-model="model.electricity_available">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="item" id="electricity" ng-show="model.electricity_available=='Yes'">
            <label>Daily Charges For Electricity:</label>
            <input type="number" className="field" ng-model="model.electricity_charges_daily" />
          </div>
          <div className="item">
            <label>Furniture Available</label>
            <select className="field" ng-model="model.furniture_available">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="item" id="furniture" ng-show="model.furniture_available=='Yes'">
            <label>Furniture Details:</label>
            <input type="text" className="field" ng-model="model.furniture_details" />
          </div>
        </div>
      </div>
      <table className="table-data">
        <tr>
          <th>AdInventory ID</th>
          <th>Inventory Type</th>
          <th>Size</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
        <tr ng-repeat="stall in model.stall_details">
          <td>
            <span>{stall?.adinventory_id}</span>
          </td>
          <td>
            <label className="checkbox">
              Canopy
              <input type="checkbox" ng-model="stall?.stall_canopy" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox">
              Small
              <input type="checkbox" ng-model="stall?.stall_small" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox">
              Medium
              <input type="checkbox" ng-model="stall?.stall_medium" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox">
              Standard
              <input type="checkbox" ng-model="stall?.car_standard" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox">
              Premium
              <input type="checkbox" ng-model="stall?.car_premium" />
              <span className="checkmark"></span>
            </label>
          </td>
          <td>
            <select className="field" ng-model="stall?.stall_size">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </td>
          <td>
            <input type="text" className="field" ng-model="stall?.stall_location" />
          </td>
          <td>
            <input
              type="button"
              className="delete-button smallBtn"
              ng-click="deleteStall(stall?.id)"
              value="Delete"
            />
          </td>
        </tr>
      </table>
      <input type="button" className="smallBtn" ng-click="onSubmit()" value="Update" />
    </div>
  );
}
