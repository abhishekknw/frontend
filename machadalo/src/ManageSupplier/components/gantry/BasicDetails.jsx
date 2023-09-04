import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';

export default function BasicDetails() {
  const { id } = useParams();
  const fetchWrapper = useFetchWrapper();
  const [vendors, setVendors] = useState();
  const [details, setDetails] = useState();

  const getOrganizations = () => {
    fetchWrapper.get(ANG_APIS.GET_ORGANIZATIONS).then((res) => {
      setVendors(res.data);
    });
  };

  const getDetails = () => {
    fetchWrapper.get(ANG_APIS.GET_LIST_GENERIC + id + `/?supplier_type_code=GN`).then((res) => {
      setDetails(res.data);
    });
  };

  useEffect(() => {
    getOrganizations();
    getDetails();
  }, []);

  return (
    <div className="tabContentBox">
      <div className="top">
        <label>Representative:</label>
        <select
          className="form-control"
          ng-model="representativeField.name"
          ng-change="setVendor()"
        >
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
      <form role="form" name="hording_form" ng-submit="updateDetails()">
        <div className="contentBox">
          <div className="item">
            <label for="supplier_id">Gantry ID</label>
            <input
              type="text"
              value={details?.supplier_id}
              className="field"
              id="supplier_id"
              ng-model="supplierDataId"
              disabled
              readonly
            />
          </div>
          <div className="item">
            <label for="supplier_name">
              Name<span>*</span>
            </label>
            <input
              type="text"
              disabled
              className="field"
              placeholder="Name"
              id="supplier_id"
              value={details?.name}
              required
            />
          </div>
          <div className="item">
            <label for="address1">
              Address1<span>*</span>
            </label>
            <input
              type="text"
              className="field"
              placeholder="Address1"
              id="address1"
              value={details?.master_data.address_supplier.address1}
              required
            />
          </div>
          <div className="item">
            <label for="address2">Address2</label>
            <input
              type="text"
              className="field"
              placeholder="Address2"
              id="address2"
              value={details?.master_data.address_supplier.address2}
            />
          </div>
          <div className="item">
            <label for="landmark_bus_shelter">Nearest LandMark</label>
            <input
              type="text"
              name="nearest_landmark"
              placeholder="Nearest LandMark"
              className="field"
              id="landmark_bus_shelter"
              value={details?.master_data.landmark}
              ng-pattern="/^[a-z0-9A-Z\s]*$/"
            />
            <div ng-show="hording_form.nearest_landmark.$error.pattern" className="error">
              Landmark Name Invalid
            </div>
          </div>
          <div className="item">
            <label for="city">City</label>
            <input
              type="text"
              className="field"
              id="city"
              placeholder="City"
              value={details?.master_data.address_supplier.city}
              disabled
              readonly
            />
          </div>
          <div className="item">
            <label for="state">State</label>
            <input
              type="text"
              className="field"
              id="state"
              placeholder="State"
              value={details?.master_data.address_supplier.state}
              readonly
            />
          </div>
          <div className="item">
            <label for="area">Area</label>
            <input
              type="text"
              className="field"
              id="area"
              placeholder="Area"
              value={details?.master_data.address_supplier.area}
              readonly
            />
          </div>
          <div className="item">
            <label for="locality">Sub Area</label>
            <input
              type="text"
              className="field"
              placeholder="Sub Area"
              id="subarea"
              value={details?.master_data.address_supplier.subarea}
              readonly
            />
          </div>
          <div className="item">
            <label for="zipcode">Zip Code</label>
            <input
              type="number"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              name="zip_code"
              placeholder="Zip Code"
              className="field"
              id="zipcode"
              value={details?.master_data.address_supplier.zipcode}
              ng-pattern="/^[0-9]{6}$/"
            />
            <div ng-show="hording_form.zip_code.$error.pattern" className="error">
              Please enter 6 digit positive numbers only
            </div>
          </div>
          <div className="item">
            <label for="latitude">Latitude</label>
            <input
              type="number"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              step="any"
              className="field"
              id="latitude"
              value={details?.master_data.address_supplier.latitude}
            />
          </div>
          <div className="item">
            <label for="longitude">Longitude</label>
            <input
              type="number"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              step="any"
              className="field"
              id="longitude"
              value={details?.master_data.address_supplier.longitude}
            />
          </div>

          <div className="item">
            <label for="comments">Comment</label>
            <input
              type="text"
              placeholder="Comment"
              className="field"
              id="comments"
              value={details?.comments}
            />
          </div>
          <div className="item">
            <label for="eyeball_count ">Eyeball Count</label>
            <input
              type="text"
              placeholder="Eyeball Count"
              className="field"
              id="eyeball_count"
              value={details?.master_data.unit_primary_count}
            />
          </div>

          <div className="item">
            <label for="traffic_count ">Traffic Count</label>
            <input
              type="text"
              placeholder="Traffic Count"
              className="field"
              id="traffic_count"
              value={details?.master_data.unit_secondary_count}
            />
          </div>
          <div className="item">
            <label for="pedestrian_count ">Pedestrian Count</label>
            <input
              type="text"
              placeholder="Pedestrian Count"
              className="field"
              id="pedestrian_count"
              value={details?.master_data.unit_tertiary_count}
            />
          </div>
          <h2 className="heading">Payment Details</h2>
          <div className="item">
            <label>Name of Gantry</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.bank_account_name"
              placeholder="Name of Gantry"
            />
          </div>
          <div className="item">
            <label>Bank Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.bank_name"
              placeholder="Bank Name"
            />
          </div>
          <div className="item">
            <label>IFSC Code</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.ifsc_code"
              placeholder="IFSC Code"
            />
          </div>
          <div className="item">
            <label>Account number</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.account_number"
              placeholder="Account number"
            />
          </div>
          <div className="item">
            <label for="terms_condition">Payment Terms & Condition</label>
            <textarea
              rows="4"
              cols="50"
              className="field"
              id="terms_condition_id"
              name="terms_condition"
              placeholder="Payment Terms & Condition"
              ng-model="ownership_details.payment_terms_condition"
            ></textarea>
          </div>
        </div>
        <h2 className="heading">Contact Details</h2>
        <div className="form-group">
          <div ng-repeat="contact1 in model.contacts track by $index">
            <div className="row list-group-item">
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Contact Type</label>
                <select
                  className="form-control"
                  style={{
                    height: '34px',
                    textAlignLast: 'center',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                  name="contact_type_{{$index}}"
                  id="contact_type_id_{{$index}}"
                  ng-model="contact1.contact_type"
                >
                  <option value="" disabled>
                    Select Contact Type
                  </option>
                  <option ng-repeat="ctype in Contact_Type track by $index" value="{{ctype}}">
                    {/* {{ctype}} */}
                  </option>
                </select>
              </div>
              <div
                className="form-group col-md-2"
                style={{ marginBottom: '20px' }}
                ng-if="contact1.contact_type =='Others' "
              >
                <label>Enter Other value</label>
                <input
                  type="text"
                  style={{
                    height: '34px',
                    textAlignLast: 'center',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                  placeholder="Contact Type"
                  className="form-control"
                  id="other_contact_type"
                  ng-model="contact1.other_contact_type"
                />
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Salutation</label>
                <select
                  style={{
                    height: '34px',
                    textAlignLast: 'center',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                  ng-model="contact1.salutation"
                >
                  <option value="" disabled="true">
                    Select Option
                  </option>
                  <option ng-repeat="sal in salutationlist" value="{{sal}}">
                    {/* {{sal}} */}
                  </option>
                </select>
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name_id"
                  style={{ width: '100%' }}
                  ng-model="contact1.name"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>STD Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="stdcode"
                  style={{ width: '100%' }}
                  ng-model="contact1.std_code"
                  placeholder="STD Code"
                />
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Phone</label>
                <input
                  type="number"
                  name="phone_name{{$index}}"
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                  className="form-control"
                  id="phone_id"
                  style={{ width: '100%' }}
                  ng-model="contact1.landline"
                  ng-pattern="/^[0-9]{6,9}$/"
                  placeholder="Phone"
                />
                <div
                  ng-show="corporate_form.phone_name{{$index}}.$error.pattern"
                  className="error"
                  style={{ fontSize: '12px' }}
                >
                  Phone number Invalid
                </div>
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Country Code</label>
                <select
                  style={{
                    height: '34px',
                    textAlignLast: 'center',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                  ng-model="contact1.country_code"
                >
                  <option value="" disabled="true">
                    Select Option
                  </option>
                  <option ng-repeat="ccode in countrycodelist" value="{{ccode}}">
                    {/* {{ccode}} */}
                  </option>
                </select>
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Mobile</label>
                <input
                  type="number"
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                  name="mobile_name{{$index}}"
                  className="form-control"
                  id="mobile_id"
                  ng-model="contact1.mobile"
                  ng-pattern="/^[0-9]{10}$/"
                  placeholder="Mobile"
                />
                <div
                  ng-show="corporate_form.mobile_name{{$index}}.$error.pattern"
                  className="error"
                  style={{ fontSize: '12px', width: '100%' }}
                >
                  Mobile number Invalid
                </div>
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Email</label>
                <input
                  type="text"
                  name="email_name{{$index}}"
                  className="form-control"
                  id="email_id"
                  style={{ width: '100%' }}
                  ng-model="contact1.email"
                  ng-pattern="/^[a-zA-Z]+[.]?[_a-zA-Z]+[@][a-zA-Z]+[.][a-zA-Z]+$/"
                  placeholder="Email"
                />
                <div
                  ng-show="corporate_form.email_name{{$index}}.$error.pattern"
                  className="error"
                  style={{ fontSize: '12px', width: '100%' }}
                >
                  Email Invalid
                </div>
              </div>
              <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                <label>Relationship Status</label>
                <select
                  style={{
                    height: '34px',
                    textAlignLast: 'center',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                  ng-model="contact1.relationship_status"
                >
                  <option value="" disabled="true">
                    Select Option
                  </option>
                  <option
                    ng-repeat="relationStatus in relationStatusOption"
                    value="{{relationStatus}}"
                  >
                    {/* {{relationStatus}} */}
                  </option>
                </select>
              </div>
              <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
                <label>Comments</label>
                <textarea
                  rows="2"
                  cols="100"
                  className="field"
                  id="comments"
                  placeholder="Comments"
                  ng-model="contact1.comments"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              <div
                className="form-group col-md-1 glyphicon glyphicon-remove"
                ng-click="removeContact($index)"
              ></div>
            </div>
          </div>
        </div>
        <br />
        <input type="button" className="smallBtn" value="Add" ng-click="addNewContact()" />
        <br />
        <br />
        <div className="bottomButtonBox">
          <button type="submit" className="smallBtn">
            Update Gantry
          </button>
        </div>
      </form>
    </div>
  );
}
