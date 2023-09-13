import { TabPanel } from 'react-tabs';
import FormInput from '../../FormInput';
import { useState } from 'react';

export default function SocietyTowerTabPanel({ key }) {
  const [inputValues, setInputValues] = useState({
    id: '',
    name: '',
    location: '',
    floors: '',
    flats: '',
    type: '',
    lift: '',
    notice: '',
    standees: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <TabPanel key={key}>
      <div style={{ marginTop: '20px' }}></div>
      <div>
        <form
          name="myForm"
          sf-schema="schema"
          sf-form="form"
          sf-model="model"
          role="form"
          ng-submit="onSubmit(myForm)"
        >
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Tower Id*"
            type="text"
            name="id"
            value={inputValues.id}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Tower Name*"
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Tower Location"
            type="text"
            name="location"
            value={inputValues.location}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="No of Floors Per Tower"
            type="number"
            name="floors"
            value={inputValues.floors}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="No of Flats Per Tower"
            type="number"
            name="flats"
            value={inputValues.flats}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="No of Type of Flats in Tower"
            type="number"
            name="type"
            value={inputValues.type}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="No of Lifts in Tower"
            type="number"
            name="lift"
            value={inputValues.lift}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="No of Notice Board in Tower"
            type="number"
            name="notice"
            value={inputValues.notice}
            onChange={handleInputChange}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="No of standees"
            type="number"
            name="standees"
            value={inputValues.standees}
            onChange={handleInputChange}
          />
          <div class="checkbox schema-form-checkbox col-md-12">
            <label class="size">
              <input
                type="checkbox"
                schema-validate="form"
                class="ng-valid-schema-form"
                name="flat_type_details_available"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Add Flat Details
              </span>
            </label>
            <div class="help-block" sf-message="form.description"></div>
          </div>
          <div class="schema-form-array col-md-7">
            <label class="control-label ng-binding">Flat Type Details</label>
            <ol class="list-group ng-pristine ng-untouched ng-valid" ui-sortable="form.sortOptions">
              <li class="list-group-item " schema-form-array-items="">
                <button
                  ng-hide="form.readonly || form.remove === null"
                  style={{ position: 'relative', zIndex: '20' }}
                  type="button"
                  class="close pull-right"
                >
                  <span aria-hidden="true">×</span>
                  <span class="sr-only">Close</span>
                </button>
                <fieldset class="schema-form-fieldset">
                  <legend ng-class="{'sr-only': !showTitle() }" class="ng-binding">
                    Add Flat Details
                  </legend>
                  <div class="form-group  schema-form-select has-feedback has-error">
                    <label class="control-label " ng-show="showTitle()">
                      Type of Flat
                    </label>
                    <select
                      sf-field-model=""
                      ng-disabled="form.readonly"
                      class="form-control  ng-invalid ng-invalid-tv4-302 ng-invalid-schema-form"
                      schema-validate="form"
                      name="flat_type"
                    >
                      <option value="?" selected="selected"></option>
                      <option label="1 RK" value="string:1 RK">
                        1 RK
                      </option>
                      <option label="1 BHK" value="string:1 BHK">
                        1 BHK
                      </option>
                      <option label="1.5 BHK" value="string:1.5 BHK">
                        1.5 BHK
                      </option>
                      <option label="2 BHK" value="string:2 BHK">
                        2 BHK
                      </option>
                      <option label="2.5 BHK" value="string:2.5 BHK">
                        2.5 BHK
                      </option>
                      <option label="3 BHK" value="string:3 BHK">
                        3 BHK
                      </option>
                      <option label="3.5 BHK" value="string:3.5 BHK">
                        3.5 BHK
                      </option>
                      <option label="4 BHK" value="string:4 BHK">
                        4 BHK
                      </option>
                      <option label="5 BHK" value="string:5 BHK">
                        5 BHK
                      </option>
                      <option label="Pent House" value="string:Pent House">
                        Pent House
                      </option>
                      <option label="Duplex" value="string:Duplex">
                        Duplex
                      </option>
                      <option label="Row House" value="string:Row House">
                        Row House
                      </option>
                    </select>
                    <div class="help-block" sf-message="form.description">
                      Required
                    </div>
                  </div>
                  <div class="form-group schema-form-number  has-feedback">
                    <label class="control-label" for="flat_count">
                      Flat Type Count
                    </label>
                    <input
                      ng-show="form.key"
                      type="number"
                      step="any"
                      sf-changed="form"
                      placeholder=""
                      class="form-control  ng-valid-schema-form"
                      id="flat_count"
                      schema-validate="form"
                      name="flat_count"
                      aria-describedby="flat_countStatus"
                    />
                    <span
                      ng-if="form.feedback !== false"
                      class="form-control-feedback ng-scope glyphicon"
                      ng-class="evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }"
                      aria-hidden="true"
                    ></span>
                    <div class="help-block" sf-message="form.description"></div>
                  </div>
                </fieldset>
              </li>
            </ol>
            <div
              class="clearfix ng-untouched ng-invalid ng-invalid-tv4-302 ng-invalid-schema-form ng-dirty"
              style={{ padding: '15px' }}
              ng-model="modelArray"
              schema-validate="form"
            >
              <div class="help-block ng-binding">Required</div>
              <button
                ng-hide="form.readonly || form.add === null"
                type="button"
                class="btn btn-primary pull-right"
              >
                <i class="glyphicon glyphicon-plus"></i> Add
              </button>
            </div>
          </div>
          <div class="form-group schema-form-submit col-md-12">
            <input type="submit" class="btn btn-primary" value="Save Tower Details" />
          </div>
          <button ng-hide="form.readonly" type="button" class="btn btn-default pull-right">
            <i class="glyphicon glyphicon-trash"></i>
            Remove
          </button>
        </form>
      </div>
    </TabPanel>
  );
}
