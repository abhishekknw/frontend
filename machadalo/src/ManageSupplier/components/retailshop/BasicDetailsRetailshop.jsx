import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { useParams } from 'react-router';

export default function BasicDetailsRetailshop() {
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
    fetchWrapper.get(ANG_APIS.GET_LIST_GENERIC + id + `/?supplier_type_code=RE`).then((res) => {
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
        <form role="form" name="retailshop_form" ng-submit="updateDetails()">
          <div className="contentBox">
            <div className="item">
              <label for="supplier_id">Retail Shop ID</label>
              <input
                type="text"
                className="field"
                id="supplier_id"
                value={details?.supplier_id}
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
                className="field"
                disabled
                id="supplier_id"
                placeholder="Name"
                value={details?.name}
                required
              />
            </div>
            <div className="item">
              <label for="city">City</label>
              <input
                type="text"
                className="field"
                id="city"
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
                value={details?.master_data.address_supplier.state}
                disabled
                readonly
              />
            </div>
            <div className="item">
              <label for="area">Area</label>
              <input
                type="text"
                className="field"
                id="area"
                value={details?.master_data.address_supplier.area}
                disabled
                readonly
              />
            </div>
            <div className="item">
              <label for="locality">Sub Area</label>
              <input
                type="text"
                className="field"
                id="subarea"
                value={details?.master_data.address_supplier.subarea}
                disabled
                readonly
              />
            </div>
            <div className="item">
              <label for="address1">
                Address1<span>*</span>
              </label>
              <input
                type="text"
                className="field"
                id="address1"
                placeholder="Address1"
                value={details?.master_data.address_supplier.address1}
                required
              />
            </div>
            <div className="item">
              <label for="address2">Address2</label>
              <input
                type="text"
                className="field"
                id="address2"
                placeholder="Address2"
                value={details?.master_data.address_supplier.address2}
              />
            </div>
            <div className="item">
              <label for="landmark">Landmark</label>
              <input
                type="text"
                className="field"
                id="landmark"
                placeholder="landmark"
                value={details?.master_data.landmark}
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
                value={details?.master_data.address_supplier.zipcode}
                ng-pattern="/^[0-9]{6}$/"
                onkeydown="javascript: return event.keyCode == 69 ? false : true"
              />
              <div ng-show="retailshop_form.zip_code.$error.pattern" className="error">
                Please enter 6 digit positive numbers only
              </div>
            </div>

            <div className="item">
              <label for="latitude">Latitude</label>
              <input
                type="number"
                step="any"
                className="field"
                placeholder="Latitude"
                id="latitude"
                value={details?.master_data.address_supplier.latitude}
                onkeydown="javascript: return event.keyCode == 69 ? false : true"
              />
            </div>
            <div className="item">
              <label for="longitude">Longitude</label>
              <input
                type="number"
                step="any"
                className="field"
                id="longitude"
                placeholder="Longitude"
                value={details?.master_data.address_supplier.longitude}
                onkeydown="javascript: return event.keyCode == 69 ? false : true"
              />
            </div>
            <div className="item">
              <label for="storeSize">Store Size</label>
              <select name="storeSize" className="field" value={details?.store_size}>
                <option value="">Select Size</option>
                {/* <option ng-repeat="size in storesSize track by $index" value="{size}">{size}</option> */}
              </select>
            </div>
            <div className="item">
              <label for="shoptype">Retail Store Type</label>
              <select className="field" name="shoptype" value={details?.retail_shop_type}>
                <option value="">Select Store Type</option>
                {/* <option ng-repeat="type in shop track by $index" value="{type}">{type}</option> */}
              </select>
            </div>
            <div className="item">
              <label for="categoryName">Category Name</label>
              <select
                name="categoryName"
                id="categoryName"
                className="field"
                value={details?.category_name}
              >
                <option value="">Select Category</option>
                {/* <option ng-repeat="category in Categorys track by $index" value="{category}">{category}</option> */}
              </select>
            </div>
            <div className="item">
              <label for="averageWeekend">Weekend Daily Footfall Count</label>
              <input
                type="number"
                step="any"
                className="field"
                placeholder="Weekend Daily Footfall Count"
                id="averageWeekend"
                value={details?.master_data.unit_primary_count}
                onkeydown="javascript: return event.keyCode == 69 ? false : true"
              />
            </div>
            <div className="item">
              <label for="averageWeekday">Weekday Daily Footfall Count</label>
              <input
                type="number"
                step="any"
                className="field"
                id="averageWeekday"
                placeholder="Weekday Daily Footfall Count"
                value={details?.master_data.unit_secondary_count}
                onkeydown="javascript: return event.keyCode == 69 ? false : true"
              />
            </div>
            <div className="item">
              <label for="billcount">Bill Count</label>
              <input
                type="number"
                step="any"
                className="field"
                id="billcount"
                placeholder="Bill Count"
                value={details?.master_data.unit_tertiary_count}
              />
            </div>
            <div className="item">
              <label for="food_tasting">Food Tasting</label>
              <select
                className="field"
                name="food_tasting"
                id="food_tasting"
                value={details?.food_tasting}
              >
                <option value="" disabled>
                  Select Contact Type
                </option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div className="item">
              <label for="comment">Comment</label>
              <input
                type="text"
                className="field"
                id="comment"
                placeholder="How Many Employee, Salves etc"
                value={details?.comments}
              />
            </div>

            <div className="item">
              <label for="rating">Machadalo Rating</label>
              <input
                type="text"
                className="field"
                id="rating"
                placeholder="Machadalo Rating"
                value={details?.rating}
              />
            </div>
            <div className="col-md-12">
              <label for="feedback">Feedback</label>
              <textarea
                rows="4"
                cols="50"
                className="field"
                id="feedback"
                placeholder="Feedback"
                value={details?.feedback}
              ></textarea>
            </div>
            <div className="item">
              <input
                type="radio"
                ng-value="ismodern"
                name="retailshop"
                value={details?.selected_retail_shop}
              />{' '}
              Modern Trade
              <input
                type="radio"
                ng-value="istraditional"
                name="retailshop"
                value={details?.selected_retail_shop}
              />
              Tradional
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
              <label for="address1">Address1</label>
              <input
                type="text"
                className="field"
                id="address1"
                placeholder="Address1"
                ng-model="ownership_details.address1"
              />
            </div>
            <div className="item">
              <label for="address2">Address2</label>
              <input
                type="text"
                className="field"
                id="address2"
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
                  ng-click="isDatepickerOpen = !isDatepickerOpen"
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
                  alt-input-formats="altInputFormats"
                  ng-click="isEndDateOpen = !isEndDateOpen"
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
            <div ng-repeat="contact1 in contactForm track by $index">
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
                  className="form-group col-md-1 glyphicon glyphicon-remove"
                  ng-click="removeContact($index)"
                ></div>
              </div>
            </div>
            <br />
          </div>
          <input type="button" className="smallBtn" value="Add" ng-click="addNewForm()" />
          <div className="bottomButtonBox">
            <button type="submit" className="smallBtn">
              Update Retail Shop
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
