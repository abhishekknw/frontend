import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function SupplierRelationship() {
  const fetchWrapper = useFetchWrapper();
  const [retail, setRetail] = useState();

  const getRelation = () => {
    fetchWrapper.get(ANG_APIS.GET_SUPPLIER_RELATIONSHIP).then((res) => {
      setRetail(res.data);
    });
  };

  useEffect(() => {
    getRelation();
  }, []);

  return (
    <div>
      <div className="col-md-12" style={{ margin: '10px' }}>
        <label className="col-md-4">Retailers available in premises : </label>
        <div className="col-md-6" ng-repeat="retail in retailShopInsidePremises">
          {retail?.name}
        </div>
        <div className="col-md-6" ng-if="retailShopInsidePremises.length == 0">
          No retailer in premises available
        </div>
      </div>
      <div className="col-md-12" style={{ margin: '10px' }}>
        <label className="col-md-4">Select retailer in premises : </label>
        <div
          className="col-md-6"
          ng-dropdown-multiselect=""
          options="nearbyRetailShopsExceptInsidePremises"
          selected-model="retailShopInsidePremisesSelected"
          extra-settings="retailShopsInsidePremisesSettings"
          translation-texts="selected_baselines_customTexts"
        ></div>
      </div>
      <div className="col-md-12" style={{ margin: '10px' }}>
        <label className="col-md-4">Preferred Retailers : </label>
        <div className="col-md-6" ng-repeat="retail in preferredRetailers">
          {retail?.name}
        </div>
        <div className="col-md-6" ng-if="preferredRetailers.length == 0">
          No preferred retailers available
        </div>
      </div>
      <div className="col-md-12" style={{ margin: '10px' }}>
        <label className="col-md-4">Select preferred retailers : </label>
        <div
          className="col-md-6"
          ng-dropdown-multiselect=""
          options="nearbyRetailShopsExceptPreferredRetailers"
          selected-model="nearbyRetailShopsSelected"
          extra-settings="nearbyRetailShopsSettings"
          translation-texts="selected_baselines_customTexts"
        ></div>
      </div>
      <input
        style={{ marginLeft: '40px' }}
        type="button"
        className="smallBtn"
        ng-click="onSubmit()"
        value="Save and Continue"
      />
    </div>
  );
}
