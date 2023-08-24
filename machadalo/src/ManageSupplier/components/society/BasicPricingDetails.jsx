import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';

export default function BasicPricingDetails() {
  const fetchWrapper = useFetchWrapper();
  const [row, setRow] = useState();
  const { id } = useParams();

  const getPricing = () => {
    fetchWrapper
      .get(ANG_APIS.GET_SOCIETY_DETAILS + id + ANG_APIS.GET_BASIC_PRICING + 'RS')
      .then((res) => {
        setRow(res.data);
      });
  };

  useEffect(() => {
    getPricing();
  }, []);

  return (
    <div>
      <table class="table-data">
        <thead>
          <th>AdInventory Name</th>
          <th>Type</th>
          <th>(Campaign/Unit) Duration</th>
          <th>Suggested Supplier Price</th>
          <th>Actual Supplier Price</th>
        </thead>
        <tbody>
          <tr ng-repeat="row in model" ng-hide="!row.duration_type">
            <td>
              <span>{row?.adinventory_type?.adinventory_name}</span>
            </td>
            <td>
              <span>{row?.adinventory_type?.adinventory_type}</span>
            </td>
            <td>
              <span>{row?.duration_type?.duration_name}</span>
            </td>
            <td>
              <input
                type="text"
                ng-change="auto_change(row)"
                ng-model="row.suggested_supplier_price"
              />
            </td>
            <td>
              <input
                type="text"
                ng-change="auto_change(row)"
                ng-model="row.actual_supplier_price"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input type="button" class="smallBtn" ng-click="onSubmit()" value="Update" />
    </div>
  );
}
