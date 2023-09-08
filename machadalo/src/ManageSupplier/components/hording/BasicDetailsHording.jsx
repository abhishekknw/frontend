import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';

export default function BasicDetailsHording() {
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
    fetchWrapper.get(ANG_APIS.GET_LIST_GENERIC + id + `/?supplier_type_code=HO`).then((res) => {
      setDetails(res.data);
    });
  };

  useEffect(() => {
    getOrganizations();
    getDetails();
  }, []);

  return (
    <>
      <div className="tabContentBox">
        <div className="top">
          <label>Representative:</label>
          <select className="field" ng-model="representativeField.name" ng-change="setVendor()">
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
              <label for="supplier_id">Hording ID</label>
              <input
                type="text"
                value={details?.supplier_id}
                className="field"
                id="supplier_id"
                ng-model="hordingId"
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
                value={details?.master_data.address_supplier?.address1}
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
                value={details?.master_data.address_supplier?.address2}
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
                value={details?.master_data.address_supplier?.city}
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
                value={details?.master_data.address_supplier?.state}
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
                value={details?.master_data.address_supplier?.area}
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
                value={details?.master_data.address_supplier?.subarea}
                readonly
              />
            </div>

            <div className="item">
              <label for="zipcode">Zip Code</label>
              <input
                type="number"
                name="zip_code"
                placeholder="Zip Code"
                className="field"
                id="zipcode"
                value={details?.master_data.address_supplier?.zipcode}
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
                step="any"
                className="field"
                id="latitude"
                value={details?.master_data.address_supplier?.latitude}
              />
            </div>
            <div className="item">
              <label for="longitude">Longitude</label>
              <input
                type="number"
                step="any"
                className="field"
                id="longitude"
                value={details?.master_data.address_supplier?.longitude}
              />
            </div>

            <div className="item">
              <label for="hording_supplier">Owner of Hording</label>
              <input
                type="text"
                name="owner_hording"
                placeholder="Owner of Hording"
                className="field"
                id="hording_supplier"
                value={details?.owner_name}
                ng-pattern="/^[a-zA-Z\s]*$/"
              />
              <div ng-show="hording_form.owner_hording.$error.pattern" className="error">
                Owner Name Invalid
              </div>
            </div>

            <div className="item">
              <label for="external_number">External Number</label>
              <input
                type="text"
                name="external_number"
                placeholder="External Number"
                className="field"
                id="external_Number"
                value={details?.external_number}
              />
            </div>

            <div className="item">
              <label for="length_of_hording">Length of Hording</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Length of Hording"
                className="field"
                id="length"
                value={details?.length}
              />
            </div>

            <div className="item">
              <label for="width_of_hording">Width of Hording</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Width of Hording"
                className="field"
                id="width_of_hording"
                value={details?.width}
              />
            </div>
            <div className="item">
              <label for="height_of_hording">Height of Hording(From Ground Level)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Height of Hording"
                className="field"
                id="height_of_hording"
                value={details?.height}
              />
            </div>

            <div className="item">
              <label for="length_of_gantry">Length of Gantry</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Length of Gantry"
                className="field"
                id="length_of_gantry"
                value={details?.length_of_gantry}
              />
            </div>

            <div className="item">
              <label for="width_of_gantry">Width of Gantry</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Width of Gantry"
                className="field"
                id="width_of_gantry"
                value={details?.width_of_gantry}
              />
            </div>
            <div className="item">
              <label for="height_of_gantry">Height of Gantry(From Ground Level)</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Height of Gantry"
                className="field"
                id="height_of_gantry"
                value={details?.height_of_gantry}
              />
            </div>

            <div className="item">
              <label>Force Majeure Clause</label>
              <select className="field" value={details?.force_majeure_clause}>
                <option value="" disabled>
                  Select Force Majeure Clause{' '}
                </option>
                {/* <option ng-repeat="lit in litlist" value="{lit}">{lit}</option> */}
              </select>
            </div>
            <div className="item">
              <label for="terms_around_print_mount">Terms Around Print & Mount</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Terms Around Print & Mount"
                className="field"
                id="terms_around_print_mount"
                value={details?.terms_around_print_mount}
              />
            </div>

            <div className="item">
              <label for="cost_per_sqft">Cost Per SQFT</label>
              <input
                type="number"
                min="0"
                step="any"
                className="field"
                placeholder="Cost Per SQFT"
                id="cost_per_sqft"
                value={details?.cost_per_sqft}
              />
            </div>
            <div className="item">
              <label for="cost_of_branding_space">Cost of Branding Space</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Square Feet"
                className="field"
                id="cost_of_branding_space"
                value={details?.cost_of_branding_space}
              />
            </div>
            <div className="item">
              <label for="printing_and_mounting_cost">Printing And Mounting Cost</label>
              <input
                type="number"
                step="any"
                min="0"
                placeholder="Printing And Mounting Cost"
                className="field"
                id="printing_and_mounting_cost"
                value={details?.printing_and_mounting_cost}
              />
            </div>

            <div className="item">
              <label for="contact_number">Contact Number</label>
              <input
                type="number"
                className="field"
                placeholder="Contact Number"
                name="contactnumber"
                id="contact_number"
                value={details?.contact_number}
                ng-pattern="/^[0-9]{10}$/"
              />
              <div ng-show="hording_form.contactnumber.$error.pattern" className="error">
                Contact Number Invalid
              </div>
            </div>

            <div className="item">
              <label for="cluster">Cluster of Hording</label>
              <input type="radio" value="YES" name="hording_cluster" />
              Yes
              <input type="radio" value="NO" name="hording_cluster" />
              No
            </div>
            <div className="item" ng-if="model.cluster_of_hording == 'YES'">
              <label for="sequence_number">Sequence Number</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Sequence Number"
                className="field"
                id="sequence_number"
                value={details?.sequence_number}
              />
            </div>

            <div className="item">
              <label for="hording_present_traffic_junction">
                Is Hording Present On Traffic Junction
              </label>
              <input type="radio" value="YES" name="hording_present_traffic_junction" />
              Yes
              <input type="radio" value="NO" name="hording_present_traffic_junction" />
              No
            </div>
            <div className="item" ng-if="model.traffic_junction == 'YES'">
              <label for="signal_waiting_time">Average Signal Waiting Time</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Average Signal Waiting Time"
                className="field"
                id="signal_waiting_time"
                value={details?.signal_waiting_time}
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
              <label for="average_peakHourTraffic">Average Peak Hour Traffic</label>
              <input
                type="text"
                placeholder="Average Peak Hour Traffic"
                className="field"
                id="average_peakHourTraffic"
                value={details?.average_peakHourTraffic}
              />
            </div>

            <div className="item">
              <label for="average_nonPeakHourTraffic">Average Non-peak Hour Traffic </label>
              <input
                type="text"
                placeholder="Average Non-peak Hour Traffic"
                className="field"
                id="average_nonPeakHourTraffic"
                value={details?.average_nonPeakHourTraffic}
              />
            </div>
            <div className="item">
              <label for="average_pedestrianDailyCount">Average Pedestrian Daily Count</label>
              <input
                type="text"
                placeholder="Average Pedestrian Daily Count"
                className="field"
                id="average_pedestrianDailyCount"
                value={details?.average_pedestrianDailyCount}
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

            <h2 className="heading">Ratings</h2>
            <div className="item">
              <label>
                Hording Quality Rating <span>*</span>
              </label>
              <select className="field" value={details?.quality_rating} required>
                <option value="" disabled>
                  Select Quality Rating
                </option>
                {/* <option ng-repeat="rating in ratinglist" value="{rating}">{rating}</option> */}
              </select>
            </div>
            <div className="item">
              <label>Hording Locality Rating</label>
              <select className="field" value={details?.locality_rating}>
                <option value="" disabled>
                  Select Locality Rating
                </option>
                {/* <option ng-repeat="loc_rating in localityratinglist" value="{loc_rating}">{loc_rating}</option> */}
              </select>
            </div>
            <div className="item">
              <label>Hording Lit Status</label>
              <select className="field" value={details?.lit_status}>
                <option value="" disabled>
                  Select Lit Status
                </option>
                {/* <option ng-repeat="lit in litlist" value="{lit}">{lit}</option> */}
              </select>
            </div>
            <div className="item">
              <label>
                Halting Buses Count<span>*</span>
              </label>
              <input
                type="number"
                name="halt_bus_count"
                className="field"
                placeholder="Halting Buses Count"
                value={details?.buses_count}
                ng-pattern="/^[1-9][0-9]*$/"
                required
              />
              <div className="error" ng-show="hording_form.halt_bus_count.$error.pattern">
                Invalid count
              </div>
            </div>

            <h2 className="heading">Ownership Details</h2>

            <div className="item">
              <label for="registered_company_name">Registered Company Name</label>
              <input
                type="text"
                className="field"
                id="registered_company_id"
                name="registered_company_name"
                placeholder="Company Name"
                ng-model="ownership_details.name"
              />
            </div>

            <div className="item">
              <label for="gst_number">GST Number</label>
              <input
                type="text"
                className="field"
                id="gst_number_id"
                name="gst_number"
                placeholder="GST Number"
                ng-model="ownership_details.gst_number"
              />
            </div>

            <div className="item">
              <label for="pan_number">PAN Number</label>
              <input
                type="text"
                className="field"
                id="pan_number_id"
                name="pan_number"
                placeholder="PAN Number"
                ng-model="ownership_details.pan_number"
              />
            </div>

            <div className="item">
              <label for="city">City</label>
              <select
                ng-options="x.city_name for x in cities"
                data-ng-model="selectedCity"
                name="city"
                className="field"
                ng-change="get_areas()"
              >
                <option value="" disabled>
                  Select City
                </option>
              </select>
            </div>
            <div className="item">
              <label for="area">Area</label>
              <select
                ng-options="x.label for x in areas"
                data-ng-model="selectedArea"
                name="areas"
                className="field"
                ng-change="get_sub_areas()"
              >
                <option value="" disabled>
                  Select Area
                </option>
              </select>
            </div>
            <div className="item">
              <label for="subarea">Sub Area</label>
              <select
                ng-options="y.subarea_name for y in sub_areas"
                data-ng-model="selectedSubArea"
                name="subareas"
                className="field"
                ng-change="selectSubArea()"
              >
                <option value="" disabled>
                  Select Sub Area
                </option>
              </select>
            </div>

            <div className="item">
              <label for="registered_address">Address1</label>
              <input
                type="text"
                className="field"
                id="registered_address_id1"
                name="registered_address2"
                placeholder="Address1"
                ng-model="ownership_details.address1"
              />
            </div>
            <div className="item">
              <label for="registered_address">Address2</label>
              <input
                type="text"
                className="field"
                id="registered_address_id2"
                name="registered_address2"
                placeholder="Address2"
                ng-model="ownership_details.address2"
              />
            </div>

            <div className="item">
              <label>Leas Period Start Date</label>
              <div className="position">
                <input
                  type="text"
                  className="field"
                  uib-datepicker-popup="dd/MM/yyyy"
                  placeholder="DD/MM/YYYY"
                  ng-change="changeStartDate()"
                  ng-model="ownership_details.start_date"
                  is-open="isDatepickerOpen"
                  datepicker-options="datepickerOptions"
                  close-text="Close"
                  alt-input-formats="altInputFormats"
                />
                <button
                  type="button"
                  className="smallBtn calendar"
                  ng-click="isDatepickerOpen = !isDatepickerOpen"
                >
                  <i className="glyphicon glyphicon-calendar"></i>
                </button>
              </div>
            </div>

            <div className="item">
              <label>Leas Period End Date</label>
              <div className="position">
                <input
                  type="text"
                  className="field"
                  uib-datepicker-popup="dd/MM/yyyy"
                  placeholder="DD/MM/YYYY"
                  ng-change="changeEndDate()"
                  ng-model="ownership_details.end_date"
                  is-open="isEndDateOpen"
                  datepicker-options="options"
                  close-text="Close"
                  ng-click="isEndDateOpen = !isEndDateOpen"
                  alt-input-formats="altInputFormats"
                />
                <button
                  type="button"
                  className="smallBtn calendar"
                  ng-click="isEndDateOpen = !isEndDateOpen"
                >
                  <i className="glyphicon glyphicon-calendar"></i>
                </button>
              </div>
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
              <div className="row list-group-item" style={{ height: '200px' }}>
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
                    name="contact_type_{$index}"
                    id="contact_type_id_{$index}"
                    ng-model="contact1.contact_type"
                  >
                    <option value="" disabled>
                      Select Contact Type
                    </option>
                    <option ng-repeat="ctype in Contact_Type track by $index" value="{ctype}">
                      {/* {ctype} */}
                    </option>
                  </select>
                </div>
                <div
                  className="form-group col-md-2"
                  style={{ marginBottom: '20px' }}
                  ng-if="contact1.contact_type =='Other' "
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
                    <option ng-repeat="sal in salutationlist" value="{sal}">
                      {/* {sal} */}
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
                    name="phone_name{$index}"
                    onkeydown="javascript: return event.keyCode == 69 ? false : true"
                    className="form-control"
                    id="phone_id"
                    style={{ width: '100%' }}
                    ng-model="contact1.landline"
                    ng-pattern="/^[0-9]{6,9}$/"
                    placeholder="Phone"
                  />
                  <div
                    ng-show="corporate_form.phone_name{$index}.$error.pattern"
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
                    <option ng-repeat="ccode in countrycodelist" value="{ccode}">
                      {/* {ccode} */}
                    </option>
                  </select>
                </div>
                <div className="form-group col-md-2" style={{ marginBottom: '20px' }}>
                  <label>Mobile</label>
                  <input
                    type="number"
                    onkeydown="javascript: return event.keyCode == 69 ? false : true"
                    name="mobile_name{$index}"
                    className="form-control"
                    id="mobile_id"
                    ng-model="contact1.mobile"
                    ng-pattern="/^[0-9]{10}$/"
                    placeholder="Mobile"
                  />
                  <div
                    ng-show="corporate_form.mobile_name{$index}.$error.pattern"
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
                    name="email_name{$index}"
                    className="form-control"
                    id="email_id"
                    style={{ width: '100%' }}
                    ng-model="contact1.email"
                    ng-pattern="/^[a-zA-Z]+[.]?[_a-zA-Z]+[@][a-zA-Z]+[.][a-zA-Z]+$/"
                    placeholder="Email"
                  />
                  <div
                    ng-show="corporate_form.email_name{$index}.$error.pattern"
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
                      value="{relationStatus}"
                    >
                      {/* {relationStatus} */}
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
                  className=" form-group col-md-1 glyphicon glyphicon-remove"
                  ng-click="removeContact($index)"
                ></div>
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
              Update Hording
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
