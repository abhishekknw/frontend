import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';

export default function BasicDetailsCorporate() {
  const { id } = useParams();
  const fetchWrapper = useFetchWrapper();
  const [vendors, setVendors] = useState();

  const getOrganizations = () => {
    fetchWrapper.get(ANG_APIS.GET_ORGANIZATIONS).then((res) => {
      setVendors(res.data);
    });
  };

  const getDetails = () => {
    fetchWrapper.get(ANG_APIS.GET_LIST_GENERIC + id + `/?supplier_type_code=CP`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getOrganizations();
    getDetails();
  }, []);

  return (
    <div className="panel-default panel-container">
      <label style={{ color: '#3c763d' }}>Representative :</label>
      <select className="form-control" ng-model="representativeField.name" ng-change="setVendor()">
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
      <form className="form-inline" role="form" name="corporate_form" ng-submit="updateDetails()">
        <input type="hidden" name="CP" ng-model="supplier_type_code" value="CP" />
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
            nvalue={details?.name}
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
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label>Possession Year</label>
          <br />
          <select
            style={{ height: '34px', width: '196px', borderRadius: '2px' }}
            ng-model="model.possession_year"
          >
            <option value="" disabled="true">
              Select Option
            </option>
            <option ng-repeat="year1 in yearslist" value="{{year1}}">
              {/* {{ year1 }} */}
            </option>
          </select>
        </div>
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label for="area">Total Area</label>
          <br />
          <input
            type="number"
            className="form-control"
            onkeydown="javascript: return event.keyCode == 69 ? false : true"
            id="area"
            ng-model="model.total_area"
            placeholder="Total Area in sq.ft"
          />
        </div>
        <br />
        <br />
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label>
            Corporate Type<sup>*</sup>
          </label>
          <br />
          <select
            style={{ height: '34px', width: '196px', borderRadius: '2px' }}
            ng-model="model.corporate_type"
            required
          >
            <option value="" disabled="true">
              Select Option
            </option>
            <option ng-repeat="cor_type in corporatetypelist" value="{{cor_type}}">
              {/* {{ cor_type }} */}
            </option>
          </select>
        </div>
        <div className="form-group col-md-6" style={{ marginBottom: '20px' }}>
          <label>Industry Segment Type</label>
          <br />
          <select
            style={{ height: '34px', width: '196px', borderRadius: '2px' }}
            ng-model="model.industry_segment"
          >
            <option value="" disabled="true">
              Select Option
            </option>
            <option ng-repeat="seg_type in segmenttypelist" value="{{seg_type}}">
              {/* {{ seg_type }} */}
            </option>
          </select>
        </div>
        <br />
        <div className="form-group col-md-12" style={{ marginBottom: '20px' }}>
          <label for="feedback">Feedback</label>
          <br />
          <textarea
            rows="4"
            cols="50"
            className="field"
            id="feedback"
            placeholder="Feedback"
            ng-model="model.feedback"
          ></textarea>
        </div>
        <br />
        <br />
        <div className="col-md-12" style={{ marginBottom: '20px' }}>
          <h3>Ratings</h3>
        </div>
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label>Corporate Quality Rating</label>
          <br />
          <select
            style={{ height: '34px', width: '196px', borderRadius: '2px' }}
            ng-model="model.quality_rating"
          >
            <option value="" disabled="true">
              Select Option
            </option>
            <option ng-repeat="rating in ratinglist" value="{{rating}}">
              {/* {{ rating }} */}
            </option>
          </select>
        </div>
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label>Corporate Quantity Rating</label>
          <br />
          <select
            style={{ height: '34px', width: '196px', borderRadius: '2px' }}
            ng-model="model.quantity_rating"
          >
            <option value="" disabled="true">
              Select Option
            </option>
            <option ng-repeat="rating1 in quantityratinglist" value="{{rating1}}">
              {/* {{ rating1 }} */}
            </option>
          </select>
        </div>
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label>Corporate Locality Rating</label>
          <br />
          <select
            style={{ height: '34px', width: '196px', borderRadius: '2px' }}
            ng-model="model.locality_rating"
          >
            <option value="" disabled="true">
              Select Option
            </option>
            <option ng-repeat="loc_rating in localityratinglist" value="{{loc_rating}}">
              {/* {{ loc_rating }} */}
            </option>
          </select>
        </div>
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label for="area">Machadalo Index</label>
          <br />
          <input
            type="number"
            className="form-control"
            id="mdindex"
            onkeydown="javascript: return event.keyCode == 69 ? false : true"
            ng-model="model.machadalo_index"
            placeholder="Machadalo Index"
            disabled
          />
        </div>
        <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
          <label for="area">Machadalo Rating</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="machadaloRating"
            ng-model="model.rating"
            placeholder="Machadalo Rating"
          />
        </div>

        <br />
        <br />
        <div className="col-md-12">
          <h3>Basic Count Details</h3>
          <br />
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>
              Number of buildings<sup>*</sup>
            </label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.building_count"
              placeholder="Number of buildings"
              required
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Number of lifts</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.totallift_count"
              placeholder="Number of lifts"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Number of entry/exit points</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.entryexit_count"
              placeholder="Number of entry/exit points"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Number of open spaces</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.openspaces_count"
              placeholder="Number of open spaces"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>No. of construction spaces</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.constructionspaces_count"
              placeholder="No. of construction spaces"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Number of parking spaces</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.parkingspaces_count"
              placeholder="Number of parking spaces"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Employees Count</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.master_data.unit_primary_count"
              placeholder="Number of Employees"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Visitors Count</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.master_data.unit_secondary_count"
              placeholder="Visitors Count"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Number of luxury cars</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.luxurycars_count"
              placeholder="Number of luxury cars"
            />
          </div>
          <div className="form-group" style={{ margin: '0% 2% 0% 2%' }}>
            <label>Number of standard cars</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.standardcars_count"
              placeholder="Number of standard cars"
            />
          </div>
          <div
            className="form-group"
            style={{ margin: '0% 2% 0% 2%' }}
            ng-if="model.corporate_type == 'Corporate Park' "
          >
            <label>
              Number of companies<sup>*</sup>
            </label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.totalcompanies_count"
              placeholder="Number of companies"
              required
            />
          </div>
          <div className="col-md-12" style={{ marginBottom: '10px', marginLeft: '-15px' }}>
            <h3>Other Details</h3>
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Constructed Space</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.constructedspace"
              placeholder="Constructed Space"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Parking Space</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.parkingspace"
              placeholder="Parking Space"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Open Space</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.openspace"
              placeholder="Open Space"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Avg Rent/sqft-unfurnished office</label>
            <br />
            <input
              type="number"
              className="form-control"
              onkeydown="javascript: return event.keyCode == 69 ? false : true"
              ng-model="model.averagerent"
              placeholder="Avg Rent/sqft-unfurnished office"
            />
          </div>
          <br />
          <br />
          <div className="form-group col-md-12" style={{ marginBottom: '20px' }}>
            <label>Real Estate Allowed</label>
            <br />
            <label>
              <input type="radio" value={1} name="opradio" ng-model="model.isrealestateallowed" />
              Yes
            </label>
            <label>
              <input type="radio" value={0} name="opradio" ng-model="model.isrealestateallowed" />
              No
            </label>
          </div>
          <br />
          <br />
          <div
            className="form-group col-md-12"
            style={{ marginBottom: '20px' }}
            ng-if="model.corporate_type == 'Corporate Park'"
          >
            <label>Corporate Park</label>
            <div>
              <label style={{ display: 'inline-block' }}>Companies Name</label>
              <label style={{ display: 'inline-block' }}>Employee Count</label>
              <br />
              <div ng-repeat="list in model.list1 track by $index" style={{ display: 'inline' }}>
                <input
                  type="text"
                  ng-model="model.list1[$index].name"
                  style={{ marginBottom: '2px' }}
                  placeholder="Companies Name"
                />
                &nbsp;&nbsp;
                <input
                  type="number"
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                  ng-model="model.list1[$index].employeeCount"
                  style={{ marginBottom: '2px' }}
                  placeholder="Employee Count"
                />
                <div
                  className="glyphicon glyphicon-remove"
                  style={{ marginLeft: '10px' }}
                  ng-click="removeCompany($index)"
                  ng-hide="$index == 0"
                ></div>
                <br />
              </div>
              <div
                className="btn btn-primary"
                ng-click="addCompanyName()"
                style={{ float: 'right', marginRight: '5px' }}
              >
                Add
              </div>
              <div
                className="btn btn-primary"
                ng-click="updateDetails()"
                style={{ float: 'right', marginRight: '5px' }}
              >
                Save & Continue
              </div>
            </div>
          </div>

          <div className="col-md-12" style={{ marginLeft: -'15px' }}>
            <label for="temp" style={{ marginLeft: '0px' }}>
              <h3>Payment Details</h3>
            </label>
            <br />
          </div>

          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Name of corporate</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.bank_account_name"
              placeholder="Name of corporate"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Bank Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.bank_name"
              placeholder="Bank Name"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>IFSC Code</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.ifsc_code"
              placeholder="IFSC Code"
            />
          </div>
          <div className="form-group col-md-3" style={{ marginBottom: '20px' }}>
            <label>Account number</label>
            <br />
            <input
              type="text"
              className="form-control"
              ng-model="ownership_details.account_number"
              placeholder="Account number"
            />
          </div>

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

          <div
            className="btn btn-primary"
            style={{ float: 'right', width: '120px', fontSize: '12px' }}
            ng-click="addNewContact()"
          >
            Add New Contact
          </div>
          <br />
          <br />
          <input
            type="submit"
            className="btn btn-info"
            style={{ marginLeft: '0px' }}
            value="Update Corporate"
            ng-disabled="corporate_form.$invalid"
          ></input>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}
