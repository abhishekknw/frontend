export default function CreateFirst() {
  return (
    <form name="form" class="" ng-submit="create()" role="form">
      <div class="panel-default panel-container">
        <h3 class="panel-heading">Supplier Initial Details</h3>
        <table style="border:hidden" class="table">
          <tr>
            <td>
              <label>City</label>
            </td>
            <td>
              <select
                name="city"
                class="form-control input-size"
                ng-change="get_areas()"
                ng-model="model.city_id"
                ng-required="true"
              >
                <option value="">Select City</option>
                <option
                  ng-repeat="city in cities | orderBy: 'city_name'"
                  value="{{city.id}}"
                  required
                >
                  {city.city_name}
                </option>
              </select>
            </td>
            <span ng-show="form.city.$dirty && form.city.$invalid" class="error">
              Select a City
            </span>
          </tr>
          <tr>
            <td>
              <label>Area</label>
            </td>
            <td>
              <select
                name="areas"
                class="form-control input-size"
                ng-change="get_sub_areas()"
                ng-model="model.area_id"
              >
                <option value="">Select Area</option>
                <option ng-repeat="area in areas | orderBy: 'label'" value="{{area.id}}" required>
                  {area.label}
                </option>
              </select>
            </td>
            <span ng-show="form.areas.$dirty && form.areas.$invalid" class="error">
              Select an Area{' '}
            </span>
          </tr>
          <tr class="form-group">
            <td>
              <label>Sub Area</label>
            </td>
            <td>
              <select
                name="subareas"
                class="form-control input-size"
                ng-change=""
                ng-model="model.subarea_id"
              >
                <option value="">Select SubArea</option>
                <option
                  ng-repeat="area in sub_areas | orderBy: 'subarea_name'"
                  value="{{area.id}}"
                  required
                >
                  {area.subarea_name}
                </option>
              </select>
            </td>
            <span ng-show="form.subareas.$dirty && form.subareas.$invalid" class="error">
              Select a Sub-Area{' '}
            </span>
          </tr>
          <tr class="form-group">
            <td>
              <label>Supplier Type</label>
            </td>
            <td>
              <select
                name="sup_type"
                class="form-control input-size"
                ng-model="model.supplier_type"
              >
                <option value="">Select Supplier Type</option>
                <option
                  ng-repeat="type in supplier_types | orderBy: 'supplier_type_name'"
                  value="{{type.supplier_type_code}}"
                  required
                >
                  {type.supplier_type_name}
                </option>
              </select>
            </td>
            <span ng-show="form.sup_type.$dirty && form.sup_type.$invalid" class="error">
              Select a Supplier Type{' '}
            </span>
          </tr>
          <tr class="form-group">
            <td>
              <label>Supplier Name</label>
            </td>
            <td>
              <input
                type="text"
                name="supplier_name"
                class="form-control input-size"
                ng-model="model.supplier_name"
                ng-required="true"
                ng-pattern="/^[a-zA-Z0-9\s\-]{1,40}$/"
              />
              <span ng-show="form.supplier_name.$error.pattern" class="error">
                incorrect name
              </span>
            </td>
          </tr>
          <tr class="form-group">
            <td>
              <label>Supplier Code</label>
            </td>
            <td>
              <input
                type="text"
                name="supplier_code"
                class="form-control input-size"
                ng-model="model.supplier_code"
                ng-required="true"
                ng-pattern="/^[A-Z0-9]{3}$/"
              />
              <div ng-show="form.supplier_code.$error.pattern" class="error">
                Supplier Code should have only capital letters and numbers. It should be max 3
                characters
              </div>
              <div ng-show="error" class="error">
                {{ error_msg }}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit" class="btn btn-primary" style="margin-bottom: 15px;">
                Create & Continue{' '}
              </button>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
    </form>
  );
}
