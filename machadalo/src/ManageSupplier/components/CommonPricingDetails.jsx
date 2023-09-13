import { useEffect } from 'react';
import { ANG_APIS } from '../api.constants';
import { useFetchWrapper } from '../../Dashboards/_helpers/fetch-wrapper';
import { useState } from 'react';
import { useParams } from 'react-router';

export default function CommonPricingDetails({ code }) {
  const { id } = useParams();
  const fetchWrapper = useFetchWrapper();
  const [pricingData, setPricingData] = useState([]);

  const getPricing = () => {
    fetchWrapper
      .get(ANG_APIS.GET_PRICING + id + `/basic_pricing/?supplierTypeCode=` + code)
      .then((res) => {
        setPricingData(res.prices);
      });
  };

  const postPricing = () => {
    fetchWrapper
      .post(ANG_APIS.GET_PRICING + id + `/basic_pricing/`, pricingData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPricing();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postPricing();
  };

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
          {pricingData.length > 0 &&
            pricingData.map((row, key) => {
              return (
                <tr ng-repeat="row in model" ng-hide="!row.duration_type" key={key}>
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
                      value={row?.suggested_supplier_price}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      ng-change="auto_change(row)"
                      value={row?.actual_supplier_price}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <input type="button" class="smallBtn" onClick={handleSubmit} value="Update" />
    </div>
  );
}
