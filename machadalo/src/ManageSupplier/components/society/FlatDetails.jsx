import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function FlatDetails() {
  const fetchWrapper = useFetchWrapper();
  const [flat, setFlat] = useState();

  const getFlat = () => {
    fetchWrapper.get(ANG_APIS.GET_FLAT_DETAILS).then((res) => {
      setFlat(res.data);
    });
  };

  useEffect(() => {
    getFlat();
  }, []);

  return (
    <div>
      {/* <div ng-if="errormsg"><h3>{{errormsg}}</h3></div> */}
      <form name="myform">
        <label>No of Flat Type: {flat?.flat_type_count}</label>
        <input type="number" class="field" ng-model="model.flat_type_count" />
        <h2 class="heading">Add Flat Details</h2>
        <table class="table-data">
          <tr>
            <th>Type of Flat*</th>
            <th>Flat Type Count</th>
            <th>Flat Size/SqFt(Builtup Area)</th>
            <th>Flat Size/SqFt(Carpet Area)</th>
            <th>Rent</th>
            <th>Action</th>
          </tr>
          <tr ng-repeat="flat in flats">
            <td>
              <select type="text" class="field" ng-model="flat.flat_type" required>
                <option ng-repeat="flatType in flat_types">{flat?.flat_type_count}</option>
              </select>
              <span class="error" ng-show="myForm.flat_type.$error.required">
                Error
              </span>
            </td>
            <td>
              <input
                type="number"
                name="flatcount{{$index}}"
                class="field"
                ng-model="flat.flat_count"
                max="1000"
                min="1"
                count
              />
            </td>
            <td>
              <input
                type="number"
                name="area{{$index}}"
                class="field"
                ng-model="flat.size_builtup_area"
                min="1"
                max="{{sizeLimit}}"
                ng-change="getSizeLimit(flat.flat_type)"
              />
            </td>
            <td>
              <input type="number" class="field" ng-model="flat.size_carpet_area" />
            </td>
            <td>
              <input
                type="number"
                name="rent{{$index}}"
                class="field"
                ng-model="flat.flat_rent"
                min="1"
              />
            </td>
            <td>
              <a
                type="button"
                class="glyphicon glyphicon-remove"
                aria-hidden="true"
                ng-click="deleteFlat($index,flat.id)"
              ></a>
            </td>
          </tr>
        </table>
        <input type="button" class="smallBtn" ng-click="addNew()" value="Add" />
        <input
          type="button"
          class="smallBtn"
          ng-click="onSubmit()"
          value="Save Flat Details"
          ng-disabled="myform.$invalid"
        />
      </form>
    </div>
  );
}
