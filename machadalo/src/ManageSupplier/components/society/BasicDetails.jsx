import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';
import FormInput from './FormInput';
import '../../bootstrap/css/bootstrap.css';

export default function BasicDetails() {
  const fetchWrapper = useFetchWrapper();
  const [vendors, setVendors] = useState();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    supplier_id: id,
    society_name: '',
    society_address1: '',
    society_address2: '',
    society_subarea: '',
    society_locality: '',
    society_city: '',
    society_state: '',
    society_zip: '',
    society_latitude: '',
    society_longitude: '',
    age_of_society: '',
    landmark: '',
    comments: '',
    rating: '',
    feedback: '',
    tower_count: '',
    flat_count: '',
    vacant_flat_count: '',
    total_tenant_flat_count: '',
    service_household_count: '',
    working_women_count: '',
    avg_household_occupants: '',
    bachelor_tenants_allowed: '',
    cars_count: '',
    luxury_cars_count: '',
    society_location_type: '',
    society_type_quality: '',
    society_type_quantity: '',
    machadalo_index: '',
    count_0_5: '',
    count_15_25: '',
    count_25_60: '',
    count_5_15: '',
    count_60above: '',
    society_off: '',
    name_for_payment: '',
    bank_name: '',
    ifsc_code: '',
    account_no: '',
    past_details: '',
  });

  const [errors, setErrors] = useState({
    supplier_id: '',
    society_name: '',
    society_address1: '',
    society_address2: '',
    society_subarea: '',
    society_locality: '',
    society_city: '',
    society_state: '',
    society_zip: '',
    society_latitude: '',
    society_longitude: '',
    age_of_society: '',
    landmark: '',
    comments: '',
    rating: '',
    feedback: '',
    tower_count: '',
    flat_count: '',
    vacant_flat_count: '',
    total_tenant_flat_count: '',
    service_household_count: '',
    working_women_count: '',
    avg_household_occupants: '',
    bachelor_tenants_allowed: '',
    cars_count: '',
    luxury_cars_count: '',
    society_location_type: '',
    society_type_quality: '',
    society_type_quantity: '',
    machadalo_index: '',
    count_0_5: '',
    count_15_25: '',
    count_25_60: '',
    count_5_15: '',
    count_60above: '',
    society_off: '',
    name_for_payment: '',
    bank_name: '',
    ifsc_code: '',
    account_no: '',
    past_details: '',
  });

  const getOrganizations = () => {
    fetchWrapper.get(ANG_APIS.GET_ORGANIZATIONS).then((res) => {
      setVendors(res.data);
    });
  };

  const getDetails = () => {
    fetchWrapper.get(ANG_APIS.GET_SOCIETY_DETAILS + id).then((res) => {
      setFormData({
        ...formData,
        ['society_name']: res?.society_data?.society_name,
        ['society_address1']: res?.society_data?.society_address1,
        ['society_address2']: res?.society_data?.society_address2,
        ['society_subarea']: res?.society_data?.society_subarea,
        ['society_locality']: res?.society_data?.society_locality,
        ['society_city']: res?.society_data?.society_city,
        ['society_state']: res?.society_data?.society_state,
        ['society_zip']: res?.society_data?.society_zip,
        ['society_latitude']: res?.society_data?.society_latitude,
        ['society_longitude']: res?.society_data?.society_longitude,
        ['age_of_society']: res?.society_data?.age_of_society,
        ['landmark']: res?.society_data?.landmark,
        ['comments']: res?.society_data?.comments,
        ['rating']: res?.society_data?.rating,
        ['feedback']: res?.society_data?.feedback,
        ['tower_count']: res?.society_data?.tower_count,
        ['flat_count']: res?.society_data?.flat_count,
        ['vacant_flat_count']: res?.society_data?.vacant_flat_count,
        ['total_tenant_flat_count']: res?.society_data?.total_tenant_flat_count,
        ['service_household_count']: res?.society_data?.service_household_count,
        ['working_women_count']: res?.society_data?.working_women_count,
        ['avg_household_occupants']: res?.society_data?.avg_household_occupants,
        ['bachelor_tenants_allowed']: res?.society_data?.bachelor_tenants_allowed,
        ['cars_count']: res?.society_data?.cars_count,
        ['luxury_cars_count']: res?.society_data?.luxury_cars_count,
        ['society_location_type']: res?.society_data?.society_location_type,
        ['society_type_quality']: res?.society_data?.society_type_quality,
        ['society_type_quantity']: res?.society_data?.society_type_quantity,
        ['machadalo_index']: res?.society_data?.machadalo_index,
        ['count_0_5']: res?.society_data?.count_0_5,
        ['count_15_25']: res?.society_data?.count_15_25,
        ['count_25_60']: res?.society_data?.count_25_60,
        ['count_5_15']: res?.society_data?.count_5_15,
        ['count_60above']: res?.society_data?.count_60above,
        ['society_off']: res?.society_data?.society_off,
        ['name_for_payment']: res?.society_data?.name_for_payment,
        ['bank_name']: res?.society_data?.bank_name,
        ['ifsc_code']: res?.society_data?.ifsc_code,
        ['account_no']: res?.society_data?.account_no,
        ['past_details']: res?.society_data?.past_details,
      });
    });
  };

  useEffect(() => {
    getOrganizations();
    getDetails();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div class="tabContentBox">
      <div class="top">
        <label>Representative:</label>
        <select class="field" ng-model="representativeField.name" ng-change="setVendor()">
          <option value="" disabled>
            Select Representative/Principal Vendor
          </option>
          {vendors &&
            vendors.map((vendor, key) => {
              return (
                <option key={key} value={vendor.name} ng-repeat="vendor in vendorData">
                  {vendor.name}
                </option>
              );
            })}
        </select>
      </div>
      <form
        name="myForm"
        onSubmit={handleSubmit}
        class="form1"
        sf-form="form"
        sf-model="model"
        role="form"
        ng-submit="onSubmit(myForm)"
      >
        <div class="contentBox"></div>
        <fieldset class="schema-form-fieldset " sf-field="0">
          <legend ng-class="{'sr-only': !showTitle() }" class="ng-binding sr-only"></legend>
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Society Id"
            type="text"
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleInputChange}
            error={errors.supplier_id}
            readOnly={true}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Society Name*"
            type="text"
            name="society_name"
            value={formData.society_name}
            onChange={handleInputChange}
            error={errors.society_name}
            readOnly={true}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Address1"
            type="text"
            name="society_address1"
            value={formData.society_address1}
            onChange={handleInputChange}
            error={errors.society_address1}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Address2"
            type="text"
            name="society_address2"
            value={formData.society_address2}
            onChange={handleInputChange}
            error={errors.society_address2}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="City*"
            type="text"
            name="society_city"
            value={formData.society_city}
            onChange={handleInputChange}
            error={errors.society_city}
            readOnly={true}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="State"
            type="text"
            name="society_state"
            value={formData.society_state}
            onChange={handleInputChange}
            error={errors.society_state}
            readOnly={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Zip Code*"
            type="text"
            name="society_zip"
            value={formData.society_zip}
            onChange={handleInputChange}
            error={errors.society_zip}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Society Id"
            type="number"
            name="Society Latitude*"
            value={formData.society_latitude}
            onChange={handleInputChange}
            error={errors.society_latitude}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Society Longitude*"
            type="number"
            name="society_longitude"
            value={formData.society_longitude}
            onChange={handleInputChange}
            error={errors.society_longitude}
            required={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Year of Possession"
            type="number"
            name="age_of_society"
            value={formData.age_of_society}
            onChange={handleInputChange}
            error={errors.age_of_society}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Landmark"
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            error={errors.landmark}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Comment"
            type="text"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            error={errors.comments}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Machadalo Rating"
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            error={errors.rating}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Feedback"
            type="text"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            error={errors.feedback}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Society Locality"
            type="text"
            name="society_locality"
            value={formData.society_locality}
            onChange={handleInputChange}
            error={errors.society_locality}
            readOnly={true}
          />
          <FormInput
            divClass="schema-form-text col-md-4"
            label="Society Sub-Area"
            type="text"
            name="society_subarea"
            value={formData.society_subarea}
            onChange={handleInputChange}
            error={errors.society_subarea}
            readOnly={true}
          />

          <div class="checkbox schema-form-checkbox col-md-12 form control2 has-success">
            <label class="size">
              <input
                type="checkbox"
                sf-changed="form"
                ng-disabled="form.readonly"
                sf-field-model=""
                schema-validate="form"
                class="ng-valid-schema-form"
                name="society_ratings"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Society Basic Counts
              </span>
            </label>
          </div>

          <FormInput
            id="tower"
            divClass="schema-form-number col-md-4"
            label="Total No of Towers"
            type="number"
            name="tower_count"
            value={formData.tower_count}
            onChange={handleInputChange}
            error={errors.tower_count}
          />

          <FormInput
            divClass="schema-form-number col-md-4"
            label="Total No of Flats"
            type="number"
            name="flat_count"
            value={formData.flat_count}
            onChange={handleInputChange}
            error={errors.flat_count}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Vacant Flat Count"
            type="number"
            name="vacant_flat_count"
            value={formData.vacant_flat_count}
            onChange={handleInputChange}
            error={errors.vacant_flat_count}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Total Tenant Flat Count"
            type="number"
            name="total_tenant_flat_count"
            value={formData.total_tenant_flat_count}
            onChange={handleInputChange}
            error={errors.total_tenant_flat_count}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Service Class Population"
            type="number"
            name="service_household_count"
            value={formData.service_household_count}
            onChange={handleInputChange}
            error={errors.service_household_count}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Working Women Count"
            type="number"
            name="working_women_count"
            value={formData.working_women_count}
            onChange={handleInputChange}
            error={errors.working_women_count}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Average Household Points"
            type="number"
            name="avg_household_occupants"
            value={formData.avg_household_occupants}
            onChange={handleInputChange}
            error={errors.avg_household_occupants}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Bachelor Tenants Allowed"
            type="number"
            name="bachelor_tenants_allowed"
            value={formData.bachelor_tenants_allowed}
            onChange={handleInputChange}
            error={errors.bachelor_tenants_allowed}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Total No of Cars"
            type="number"
            name="cars_count"
            value={formData.cars_count}
            onChange={handleInputChange}
            error={errors.cars_count}
          />

          <FormInput
            divClass="schema-form-number col-md-4"
            label="Total No of Luxury Cars"
            type="number"
            name="luxury_cars_count"
            value={formData.luxury_cars_count}
            onChange={handleInputChange}
            error={errors.luxury_cars_count}
          />

          <div class="checkbox schema-form-checkbox col-md-12 form control2 has-success">
            <label class="size">
              <input
                type="checkbox"
                sf-changed="form"
                ng-disabled="form.readonly"
                sf-field-model=""
                schema-validate="form"
                class="ng-valid-schema-form"
                name="society_ratings"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Ratings
              </span>
            </label>
          </div>

          <FormInput
            divClass="schema-form-number col-md-4"
            label="Society Locality Rating"
            type="text"
            name="society_location_type"
            value={formData.society_location_type}
            onChange={handleInputChange}
            error={errors.society_location_type}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Society Quality Rating"
            type="dropdown"
            name="society_type_quality"
            value={formData.society_type_quality}
            onChange={handleInputChange}
            error={errors.society_type_quality}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Society Quantity Rating"
            type="text"
            name="society_type_quantity"
            value={formData.society_type_quantity}
            onChange={handleInputChange}
            error={errors.society_type_quantity}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Machadalo Index"
            type="number"
            name="machadalo_index"
            value={formData.machadalo_index}
            onChange={handleInputChange}
            error={errors.machadalo_index}
          />

          <div class="checkbox schema-form-checkbox col-md-12 form control2 has-success">
            <label class="size">
              <input
                type="checkbox"
                sf-changed="form"
                ng-disabled="form.readonly"
                sf-field-model=""
                schema-validate="form"
                class="ng-valid-schema-form"
                name="society_ratings"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Society Demographic Details
              </span>
            </label>
          </div>
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Nursery School going Kids(0-5)"
            type="number"
            name="count_0_5"
            value={formData.count_0_5}
            onChange={handleInputChange}
            error={errors.count_0_5}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="School Going Children(5-15)"
            type="number"
            name="count_5_15"
            value={formData.count_5_15}
            onChange={handleInputChange}
            error={errors.count_5_15}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Residents In Age Group 15-25"
            type="number"
            name="count_15_25"
            value={formData.count_15_25}
            onChange={handleInputChange}
            error={errors.count_15_25}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Residents In Age Group 25-60"
            type="number"
            name="count_25_60"
            value={formData.count_25_60}
            onChange={handleInputChange}
            error={errors.count_25_60}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Residents In Age Group above 60"
            type="number"
            name="count_60above"
            value={formData.count_60above}
            onChange={handleInputChange}
            error={errors.count_60above}
          />

          <div class="checkbox schema-form-checkbox col-md-12 form control2 has-success">
            <label class="size">
              <input
                type="checkbox"
                sf-changed="form"
                ng-disabled="form.readonly"
                sf-field-model=""
                schema-validate="form"
                class="ng-valid-schema-form"
                name="society_ratings"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Society Weekly Off
              </span>
            </label>
          </div>
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Society Weekly Off"
            type="dropdown"
            name="society_off"
            value={formData.society_off}
            onChange={handleInputChange}
            error={errors.society_off}
          />

          <div class="checkbox schema-form-checkbox col-md-12 form control2 has-success">
            <label class="size">
              <input
                type="checkbox"
                sf-changed="form"
                ng-disabled="form.readonly"
                sf-field-model=""
                schema-validate="form"
                class="ng-valid-schema-form"
                name="society_ratings"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Payment Details of Society
              </span>
            </label>
          </div>
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Name of Society"
            type="text"
            name="name_for_payment"
            value={formData.name_for_payment}
            onChange={handleInputChange}
            error={errors.name_for_payment}
          />

          <FormInput
            divClass="schema-form-number col-md-4"
            label="Bank Name"
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleInputChange}
            error={errors.bank_name}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="IFSC CODE"
            type="text"
            name="ifsc_code"
            value={formData.ifsc_code}
            onChange={handleInputChange}
            error={errors.ifsc_code}
          />
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Account Number"
            type="number"
            name="account_no"
            value={formData.account_no}
            onChange={handleInputChange}
            error={errors.account_no}
          />

          <div class="checkbox schema-form-checkbox col-md-12 form control2 has-success">
            <label class="size">
              <input
                type="checkbox"
                sf-changed="form"
                ng-disabled="form.readonly"
                sf-field-model=""
                schema-validate="form"
                class="ng-valid-schema-form"
                name="society_ratings"
              />
              <span ng-bind-html="form.title" class="ng-binding">
                Past Campaigns Details
              </span>
            </label>
          </div>
          <FormInput
            divClass="schema-form-number col-md-4"
            label="Past Campaigns Occurred"
            type="dropdown"
            name="past_details"
            value={formData.past_details}
            onChange={handleInputChange}
            error={errors.past_details}
          />
        </fieldset>
      </form>
    </div>
  );
}
