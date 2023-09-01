import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';

export default function BasicDetailsGym() {
  const { id } = useParams();
  const fetchWrapper = useFetchWrapper();
  const [vendors, setVendors] = useState();

  const getOrganizations = () => {
    fetchWrapper.get(ANG_APIS.GET_ORGANIZATIONS).then((res) => {
      setVendors(res.data);
    });
  };

  const getDetails = () => {
    fetchWrapper.get(ANG_APIS.GET_LIST_GENERIC + id + `/?supplier_type_code=GY`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getOrganizations();
    getDetails();
  }, []);

  return (
    <>
      <div className="panel-default panel-container">
        <label style={{ color: '#3c763d' }}>Representative :</label>
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
        <br />
        <form className="form-inline" role="form" name="gym_form" ng-submit="updateDetails()">
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="supplier_id">Corporate ID</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="supplier_id"
              ng-model="corporateId"
              placeholder="Corporate ID"
              readonly
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="supplier_name">Name</label>
            <br />
            <input
              type="text"
              disabled
              className="form-control"
              id="supplier_id"
              value={details?.name}
              placeholder="Name"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="address1">
              Address1<sup>*</sup>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="address1"
              value={details?.master_data.address_supplier.address1}
              placeholder="Address1"
              required
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="address2">Address2</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="address2"
              value={details?.master_data.address_supplier.address2}
              placeholder="Address2"
            />
          </div>

          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="locality">Locality</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="locality"
              value={details?.master_data.address_supplier.area}
              placeholder="Locality"
              readonly
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="locality">Sub Area</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="subarea"
              value={details?.master_data.address_supplier.subarea}
              placeholder="Sub Area"
              readonly
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="city">City</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="city"
              value={details?.master_data.address_supplier.city}
              disabled
              placeholder="City"
              readonly
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="state">State</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="state"
              value={details?.master_data.address_supplier.state}
              placeholder="State"
              readonly
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="zipcode">Zip Code</label>
            <br />
            <input
              type="number"
              name="zip_code"
              className="form-control"
              id="zipcode"
              value={details?.master_data.address_supplier.zipcode}
              ng-pattern="/^[0-9]{6}$/"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              placeholder="Zip Code"
            />
            <div
              ng-show="corporate_form.zip_code.$error.pattern"
              className="error"
              style={{ fontSize: '12px' }}
            >
              Please enter 6 digit positive numbers only
            </div>
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="latitude">Latitude</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="latitude"
              value={details?.master_data.address_supplier.latitude}
              placeholder="Latitude"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="longitude">Longitude</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="longitude"
              value={details?.master_data.address_supplier.longitude}
              placeholder="Longitude"
            />
          </div>
          <div className="col-md-12" style={{ marginLeft: '-15px' }}>
            <label for="temp" style={{ marginLeft: '0px' }}>
              <h3>Categorization</h3>
            </label>
            <br />
          </div>

          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>
              Gym Type<sup>*</sup>
            </label>
            <br />

            <select className="form-control" ng-model="model.gym_type" required>
              <option value="" disabled>
                Select Gym Type
              </option>
              <option ng-repeat="gym_type in gymtypelist" value="{{gym_type}}">
                {/* {{ gym_type }} */}
              </option>
            </select>
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Chain/Individual</label>
            <br />
            <select className="form-control" ng-model="model.gym_type_chain">
              <option value="" disabled>
                Select Chain/Individual{' '}
              </option>
              <option ng-repeat="item1 in chainlist" value="{{item1}}">
                {/* {{ item1 }} */}
              </option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label for="origin">Chain Origin</label>
            <br />
            <input
              type="text"
              placeholder="Chain Origin"
              className="form-control"
              id="origin"
              ng-model="model.chain_origin"
            />
          </div>

          <br />
          <br />
          <div className="col-md-12" style={{ marginLeft: '-15px' }}>
            <label for="temp" style={{ marginLeft: '0px' }}>
              <h3>Counts and Ratings</h3>
            </label>
            <br />
          </div>

          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="footfall_day">Weekday Daily Footfall Count</label>
            <br />
            <input
              type="number"
              className="form-control"
              placeholder="Weekday Daily Footfall Count"
              id="footfall_day"
              ng-model="model.master_data.unit_secondary_count"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="footfall_weekend">Weekend Daily Footfall Count</label>
            <br />
            <input
              type="number"
              className="form-control"
              placeholder="Weekend Daily Footfall Count"
              id="footfall_weekend"
              ng-model="model.master_data.unit_primary_count"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label for="membership_count">Membership Count</label>
            <br />
            <input
              type="number"
              className="form-control"
              id="membership_count"
              placeholder="Membership Count"
              ng-model="model.master_data.unit_tertiary_count"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Gym Rating</label>
            <br />
            <select className="form-control" ng-model="model.category">
              <option value="" disabled>
                Select Gym Rating{' '}
              </option>
              <option ng-repeat="cat in categorylist" value="{{cat}}">
                {/* {{ cat }} */}
              </option>
            </select>
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Locality Rating</label>
            <br />
            <select className="form-control" ng-model="model.locality_rating">
              <option value="" disabled>
                Select Locality Rating{' '}
              </option>
              <option ng-repeat="lrating in localityratinglist" value="{{lrating}}">
                {/* {{ lrating }} */}
              </option>
            </select>
          </div>
          <div className="form-group " style={{ marginBottom: '20px' }}>
            <label for="area">Machadalo Index</label>
            <br />
            <input
              type="number"
              placeholder="Machadalo Index"
              className="form-control"
              id="mdindex"
              ng-model="model.machadalo_index"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              disabled
            />
          </div>

          <br />
          <br />
          <div className="col-md-12" style={{ marginLeft: '-15px' }}>
            <label for="temp" style={{ marginLeft: '0px' }}>
              <h3>Other Details</h3>
            </label>
            <br />
          </div>

          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Current Advertising Media</label>
            <br />
            <input
              type="text"
              placeholder="Current Advertising Media"
              className="form-control"
              ng-model="model.advertising_media"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Diet Chart/Workout Planner(6 months)</label>
            <br />
            <input
              type="number"
              placeholder="Diet Chart"
              className="form-control"
              ng-model="model.dietchart_price"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
            />
          </div>
          <div className="form-group " style={{ marginBottom: '20px' }}>
            <label for="membership">Total Membership/Annum</label>
            <br />
            <input
              type="number"
              placeholder="Total Membership/Annum"
              className="form-control"
              id="membership"
              ng-model="model.totalmembership_perannum"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
            />
          </div>

          <br />
          <br />

          <div className="col-md-12" style={{ marginLeft: '-15px' }}>
            <label for="temp" style={{ marginLeft: '0px' }}>
              <h3>Payment Details</h3>
            </label>
            <br />
          </div>

          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Gym Name</label>
            <br />
            <input
              type="text"
              placeholder="Gym Name"
              className="form-control"
              ng-model="ownership_details.bank_account_name"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Bank Name</label>
            <br />
            <input
              type="text"
              placeholder="Bank Name"
              className="form-control"
              ng-model="ownership_details.bank_name"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>IFSC Code</label>
            <br />
            <input
              type="text"
              placeholder="IFSC Code"
              className="form-control"
              ng-model="ownership_details.ifsc_code"
            />
          </div>
          <div className="form-group " style={{ marginBottom: '20px' }}>
            <label>Account Number</label>
            <br />
            <input
              type="text"
              placeholder="Account Number"
              className="form-control"
              ng-model="ownership_details.account_number"
            />
          </div>

          <h2 className="heading">Contact Details</h2>
          <div className="col-md-12" style={{ marginLeft: -'15px' }}>
            <label for="temp" style={{ marginLeft: '0px' }}>
              <h3>Contact Details</h3>
            </label>
            <br />
          </div>
          <div className="form-group">
            <div ng-repeat="contact1 in model.contacts track by $index">
              <div className="row list-group-item" style={{ height: '200px' }}>
                <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                  <label>Contact Type</label>
                  <select
                    style={{
                      height: '34px',
                      textAlignLast: 'center',
                      borderRadius: '2px',
                      width: '100%',
                    }}
                    ng-model="contact1.contact_type"
                  >
                    <option value="" disabled="true">
                      Select Option
                    </option>
                    <option ng-repeat="ctype in typelist" value="{{ctype}}">
                      {/* {{ ctype }} */}
                    </option>
                  </select>
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
                      {/* {{ sal }} */}
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
                <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
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
                <div
                  className=" form-group col-md-1 glyphicon glyphicon-remove"
                  ng-click="removeContact($index)"
                ></div>
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
                      {/* {{ ccode }} */}
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
                      width: '100%',
                      textAlignLast: 'center',
                      borderRadius: '2px',
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
                      {/* {{ relationStatus }} */}
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
                <br />
              </div>
            </div>
            <br />
          </div>

          <input type="button" className="smallBtn" value="Add" ng-click="addNewContact()" />
          <br />
          <br />
          <div className="bottomButtonBox">
            <button type="submit" className="smallBtn">
              Update Gym
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
